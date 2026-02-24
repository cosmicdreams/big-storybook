/**
 * share-webrtc Web Component
 * A production-ready screen sharing and recording custom element.
 */
export class ShareWebRTC extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.stream = null;
        this.recorder = null;
        this.chunks = [];
        this.isRecording = false;
    }

    async connectedCallback() {
        await this.render();
        this.setupEventListeners();
    }

    async render() {
        const templateHtml = await fetch(new URL('./template.html', import.meta.url)).then(r => r.text());
        const styleHtml = await fetch(new URL('./share-webrtc.css', import.meta.url)).then(r => r.text());

        this.shadowRoot.innerHTML = `
            <style>${styleHtml}</style>
            ${templateHtml}
        `;

        this.elements = {
            startBtn: this.shadowRoot.getElementById('startBtn'),
            recordBtn: this.shadowRoot.getElementById('recordBtn'),
            stopBtn: this.shadowRoot.getElementById('stopBtn'),
            video: this.shadowRoot.getElementById('video'),
            placeholder: this.shadowRoot.getElementById('placeholder'),
            status: this.shadowRoot.getElementById('status'),
            fullscreenBtn: this.shadowRoot.getElementById('fullscreenBtn')
        };
    }

    setupEventListeners() {
        this.elements.startBtn.addEventListener('click', () => this.startSharing());
        this.elements.stopBtn.addEventListener('click', () => this.stopSharing());
        this.elements.recordBtn.addEventListener('click', () => this.toggleRecording());
        this.elements.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

        this.elements.video.addEventListener('loadedmetadata', () => {
            this.elements.video.play();
        });
    }

    async startSharing() {
        try {
            this.updateStatus('requesting', 'Requesting screen access...');
            this.stream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true
            });

            this.elements.video.srcObject = this.stream;
            this.elements.video.classList.remove('screen-share-video--hidden');
            this.elements.placeholder.classList.add('screen-share-placeholder--hidden');
            this.elements.fullscreenBtn.classList.remove('screen-share-fullscreen-btn--hidden');

            this.elements.startBtn.disabled = true;
            this.elements.stopBtn.disabled = false;
            this.elements.recordBtn.disabled = false;

            const videoTrack = this.stream.getVideoTracks()[0];
            this.updateStatus('sharing', `Sharing: ${videoTrack.label || 'Screen'}`);

            videoTrack.onended = () => this.stopSharing();
        } catch (err) {
            console.error('Error sharing screen:', err);
            this.updateStatus('error', `Error: ${err.message}`);
        }
    }

    stopSharing() {
        if (this.isRecording) this.stopRecording();

        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }

        this.elements.video.srcObject = null;
        this.elements.video.classList.add('screen-share-video--hidden');
        this.elements.placeholder.classList.remove('screen-share-placeholder--hidden');
        this.elements.fullscreenBtn.classList.add('screen-share-fullscreen-btn--hidden');

        this.elements.startBtn.disabled = false;
        this.elements.stopBtn.disabled = true;
        this.elements.recordBtn.disabled = true;

        this.updateStatus('idle', 'Sharing stopped');
    }

    toggleRecording() {
        if (this.isRecording) {
            this.stopRecording();
        } else {
            this.startRecording();
        }
    }

    startRecording() {
        if (!this.stream) return;

        this.chunks = [];
        this.recorder = new MediaRecorder(this.stream);

        this.recorder.ondataavailable = (e) => {
            if (e.data.size > 0) this.chunks.push(e.data);
        };

        this.recorder.onstop = () => {
            const blob = new Blob(this.chunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `recording-${new Date().toISOString()}.webm`;
            a.click();
            URL.revokeObjectURL(url);
        };

        this.recorder.start();
        this.isRecording = true;
        this.elements.recordBtn.classList.add('screen-share-btn--recording');
        this.elements.recordBtn.innerHTML = `
            <svg class="screen-share-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12"></rect></svg>
            Stop Recording
        `;
        this.updateStatus('recording', 'Recording in progress...');
    }

    stopRecording() {
        if (!this.recorder || this.recorder.state === 'inactive') return;

        this.recorder.stop();
        this.isRecording = false;
        this.elements.recordBtn.classList.remove('screen-share-btn--recording');
        this.elements.recordBtn.innerHTML = `
            <svg class="screen-share-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
            Record
        `;
        const videoTrack = this.stream.getVideoTracks()[0];
        this.updateStatus('sharing', `Sharing: ${videoTrack.label || 'Screen'}`);
    }

    updateStatus(type, message) {
        this.elements.status.className = `screen-share-status screen-share-status--${type}`;
        this.elements.status.innerHTML = `
            <span class="screen-share-status-indicator"></span>
            ${message}
        `;
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.elements.video.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
}

if (!customElements.get('share-webrtc')) {
    customElements.define('share-webrtc', ShareWebRTC);
}
