/**
 * WebRTC Stories - CSF3 Format
 * Screen sharing component using the Screen Capture API
 */

// Component styles
import '../css/webrtc/screen-share.css';

/**
 * Creates a WebRTC Screen Sharing component
 * Allows users to share their screen using the browser's Screen Capture API
 */
function createScreenShareComponent() {
  // Main container
  const container = document.createElement('div');
  container.className = 'screen-share';

  // State
  let mediaStream = null;
  let isSharing = false;

  // Icons as SVG strings
  const icons = {
    screenShare: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
    stop: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"></rect></svg>`,
    monitor: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line><path d="M7 8l3 3-3 3"></path><line x1="12" y1="11" x2="17" y2="11"></line></svg>`,
    fullscreen: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>`,
  };

  // Header
  const header = document.createElement('div');
  header.className = 'screen-share-header';
  header.innerHTML = `
    <h2>Screen Sharing</h2>
    <p>Share your screen, window, or browser tab with WebRTC</p>
  `;
  container.appendChild(header);

  // Controls
  const controls = document.createElement('div');
  controls.className = 'screen-share-controls';

  // Start button
  const startBtn = document.createElement('button');
  startBtn.className = 'screen-share-btn screen-share-btn--start';
  startBtn.innerHTML = `<span class="screen-share-btn-icon">${icons.screenShare}</span> Start Sharing`;

  // Stop button
  const stopBtn = document.createElement('button');
  stopBtn.className = 'screen-share-btn screen-share-btn--stop';
  stopBtn.innerHTML = `<span class="screen-share-btn-icon">${icons.stop}</span> Stop Sharing`;
  stopBtn.disabled = true;

  controls.appendChild(startBtn);
  controls.appendChild(stopBtn);
  container.appendChild(controls);

  // Preview area
  const preview = document.createElement('div');
  preview.className = 'screen-share-preview';

  // Placeholder (shown when not sharing)
  const placeholder = document.createElement('div');
  placeholder.className = 'screen-share-placeholder';
  placeholder.innerHTML = `
    <div class="screen-share-placeholder-icon">${icons.monitor}</div>
    <p>Click "Start Sharing" to share your screen</p>
  `;
  preview.appendChild(placeholder);

  // Video element (hidden initially)
  const video = document.createElement('video');
  video.autoplay = true;
  video.playsInline = true;
  video.muted = true;
  video.style.display = 'none';
  preview.appendChild(video);

  // Fullscreen button
  const fullscreenBtn = document.createElement('button');
  fullscreenBtn.className = 'screen-share-fullscreen-btn';
  fullscreenBtn.innerHTML = icons.fullscreen;
  fullscreenBtn.title = 'Toggle fullscreen';
  fullscreenBtn.style.display = 'none';
  preview.appendChild(fullscreenBtn);

  container.appendChild(preview);

  // Status indicator
  const status = document.createElement('div');
  status.className = 'screen-share-status screen-share-status--idle';
  status.innerHTML = `<span class="screen-share-status-indicator"></span>Ready to share`;
  container.appendChild(status);

  // Update UI state
  function updateUI(state, message) {
    status.className = `screen-share-status screen-share-status--${state}`;
    status.innerHTML = `<span class="screen-share-status-indicator"></span>${message}`;

    if (state === 'sharing') {
      startBtn.disabled = true;
      stopBtn.disabled = false;
      placeholder.style.display = 'none';
      video.style.display = 'block';
      fullscreenBtn.style.display = 'block';
    } else {
      startBtn.disabled = false;
      stopBtn.disabled = true;
      placeholder.style.display = 'flex';
      video.style.display = 'none';
      fullscreenBtn.style.display = 'none';
    }
  }

  // Start screen sharing
  async function startScreenShare() {
    try {
      // Check if screen sharing is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        throw new Error('Screen sharing is not supported in this browser');
      }

      updateUI('idle', 'Requesting screen access...');

      // Request screen capture
      mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: 'always',
          displaySurface: 'monitor',
        },
        audio: false,
      });

      // Set video source
      video.srcObject = mediaStream;
      isSharing = true;

      // Get track info for display
      const videoTrack = mediaStream.getVideoTracks()[0];
      const settings = videoTrack.getSettings();
      const label = videoTrack.label || 'Screen';

      console.log('Screen sharing started:', {
        label: label,
        width: settings.width,
        height: settings.height,
        frameRate: settings.frameRate,
      });

      updateUI('sharing', `Sharing: ${label}`);

      // Listen for track ended (user stops via browser UI)
      videoTrack.onended = () => {
        console.log('Screen sharing stopped by user');
        stopScreenShare();
      };
    } catch (error) {
      console.error('Screen sharing error:', error);

      let errorMessage = 'Failed to start screen sharing';
      if (error.name === 'NotAllowedError') {
        errorMessage = 'Permission denied. Please allow screen sharing.';
      } else if (error.name === 'NotFoundError') {
        errorMessage = 'No screen available for sharing';
      } else if (error.name === 'NotSupportedError') {
        errorMessage = 'Screen sharing is not supported in this browser';
      } else if (error.message) {
        errorMessage = error.message;
      }

      updateUI('error', errorMessage);

      // Reset to idle after showing error
      setTimeout(() => {
        if (!isSharing) {
          updateUI('idle', 'Ready to share');
        }
      }, 3000);
    }
  }

  // Stop screen sharing
  function stopScreenShare() {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
        console.log('Track stopped:', track.label);
      });
      mediaStream = null;
    }

    video.srcObject = null;
    isSharing = false;
    updateUI('idle', 'Screen sharing stopped');
  }

  // Toggle fullscreen
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      preview.requestFullscreen().catch((err) => {
        console.error('Fullscreen error:', err);
      });
    } else {
      document.exitFullscreen();
    }
  }

  // Event listeners
  startBtn.addEventListener('click', startScreenShare);
  stopBtn.addEventListener('click', stopScreenShare);
  fullscreenBtn.addEventListener('click', toggleFullscreen);

  return container;
}

export default {
  title: 'WebRTC',
};

export const ScreenSharing = {
  name: 'Screen Sharing',
  render: () => createScreenShareComponent(),
};

export const ScreenSharingInfo = {
  name: 'Screen Sharing (Info)',
  render: () => {
    const info = document.createElement('div');
    info.className = 'screen-share';
    info.innerHTML = `
      <div class="screen-share-header">
        <h2>About WebRTC Screen Sharing</h2>
      </div>
      <div style="padding: 20px; background: #f9fafb; border-radius: 12px; line-height: 1.6;">
        <h3 style="margin-top: 0;">How it works</h3>
        <p>This component uses the <strong>Screen Capture API</strong> (part of WebRTC) to share your screen:</p>
        <ol>
          <li><code>navigator.mediaDevices.getDisplayMedia()</code> requests screen access</li>
          <li>Browser shows a picker to select screen, window, or tab</li>
          <li>Returns a <code>MediaStream</code> attached to a <code>&lt;video&gt;</code> element</li>
          <li>Track's <code>onended</code> event handles when user stops sharing</li>
        </ol>

        <h3>Browser Support</h3>
        <ul>
          <li>Chrome/Edge: Full support</li>
          <li>Firefox: Full support</li>
          <li>Safari: Supported (macOS 13+, iOS 16+)</li>
        </ul>

        <h3>Permissions</h3>
        <p>Screen sharing requires:</p>
        <ul>
          <li>HTTPS or localhost</li>
          <li>User gesture (click) to initiate</li>
          <li>Explicit user consent via browser picker</li>
        </ul>

        <h3>Extending the Component</h3>
        <p>Common enhancements:</p>
        <ul>
          <li>Add audio sharing: <code>{ audio: true }</code> in options</li>
          <li>Stream to remote peer via RTCPeerConnection</li>
          <li>Record with MediaRecorder API</li>
          <li>Add screen annotation/drawing tools</li>
        </ul>
      </div>
    `;
    return info;
  },
};
