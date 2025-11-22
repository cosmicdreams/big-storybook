function M(){const r=document.createElement("div");r.className="screen-share";let o=null,S=!1;const p={screenShare:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',stop:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"></rect></svg>',monitor:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line><path d="M7 8l3 3-3 3"></path><line x1="12" y1="11" x2="17" y2="11"></line></svg>',fullscreen:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>'},w=document.createElement("div");w.className="screen-share-header",w.innerHTML=`
    <h2>Screen Sharing</h2>
    <p>Share your screen, window, or browser tab with WebRTC</p>
  `,r.appendChild(w);const u=document.createElement("div");u.className="screen-share-controls";const a=document.createElement("button");a.className="screen-share-btn screen-share-btn--start",a.innerHTML=`<span class="screen-share-btn-icon">${p.screenShare}</span> Start Sharing`;const i=document.createElement("button");i.className="screen-share-btn screen-share-btn--stop",i.innerHTML=`<span class="screen-share-btn-icon">${p.stop}</span> Stop Sharing`,i.disabled=!0,u.appendChild(a),u.appendChild(i),r.appendChild(u);const l=document.createElement("div");l.className="screen-share-preview";const c=document.createElement("div");c.className="screen-share-placeholder",c.innerHTML=`
    <div class="screen-share-placeholder-icon">${p.monitor}</div>
    <p>Click "Start Sharing" to share your screen</p>
  `,l.appendChild(c);const s=document.createElement("video");s.autoplay=!0,s.playsInline=!0,s.muted=!0,s.style.display="none",l.appendChild(s);const t=document.createElement("button");t.className="screen-share-fullscreen-btn",t.innerHTML=p.fullscreen,t.title="Toggle fullscreen",t.style.display="none",l.appendChild(t),r.appendChild(l);const d=document.createElement("div");d.className="screen-share-status screen-share-status--idle",d.innerHTML='<span class="screen-share-status-indicator"></span>Ready to share',r.appendChild(d);function h(e,n){d.className=`screen-share-status screen-share-status--${e}`,d.innerHTML=`<span class="screen-share-status-indicator"></span>${n}`,e==="sharing"?(a.disabled=!0,i.disabled=!1,c.style.display="none",s.style.display="block",t.style.display="block"):(a.disabled=!1,i.disabled=!0,c.style.display="flex",s.style.display="none",t.style.display="none")}async function E(){try{if(!navigator.mediaDevices||!navigator.mediaDevices.getDisplayMedia)throw new Error("Screen sharing is not supported in this browser");h("idle","Requesting screen access..."),o=await navigator.mediaDevices.getDisplayMedia({video:{cursor:"always",displaySurface:"monitor"},audio:!1}),s.srcObject=o,S=!0;const e=o.getVideoTracks()[0],n=e.getSettings(),y=e.label||"Screen";console.log("Screen sharing started:",{label:y,width:n.width,height:n.height,frameRate:n.frameRate}),h("sharing",`Sharing: ${y}`),e.onended=()=>{console.log("Screen sharing stopped by user"),v()}}catch(e){console.error("Screen sharing error:",e);let n="Failed to start screen sharing";e.name==="NotAllowedError"?n="Permission denied. Please allow screen sharing.":e.name==="NotFoundError"?n="No screen available for sharing":e.name==="NotSupportedError"?n="Screen sharing is not supported in this browser":e.message&&(n=e.message),h("error",n),setTimeout(()=>{S||h("idle","Ready to share")},3e3)}}function v(){o&&(o.getTracks().forEach(e=>{e.stop(),console.log("Track stopped:",e.label)}),o=null),s.srcObject=null,S=!1,h("idle","Screen sharing stopped")}function R(){document.fullscreenElement?document.exitFullscreen():l.requestFullscreen().catch(e=>{console.error("Fullscreen error:",e)})}return a.addEventListener("click",E),i.addEventListener("click",v),t.addEventListener("click",R),r}const N={title:"WebRTC"},m={name:"Screen Sharing",render:()=>M()},g={name:"Screen Sharing (Info)",render:()=>{const r=document.createElement("div");return r.className="screen-share",r.innerHTML=`
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
    `,r}};var f,b,x;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: 'Screen Sharing',
  render: () => createScreenShareComponent()
}`,...(x=(b=m.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var C,k,T;g.parameters={...g.parameters,docs:{...(C=g.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: 'Screen Sharing (Info)',
  render: () => {
    const info = document.createElement('div');
    info.className = 'screen-share';
    info.innerHTML = \`
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
    \`;
    return info;
  }
}`,...(T=(k=g.parameters)==null?void 0:k.docs)==null?void 0:T.source}}};const H=["ScreenSharing","ScreenSharingInfo"];export{m as ScreenSharing,g as ScreenSharingInfo,H as __namedExportsOrder,N as default};
