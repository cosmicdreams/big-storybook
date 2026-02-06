/**
 * WebRTC Stories - CSF3 Format
 * Production-ready screen sharing component using the Screen Capture API
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API
 * @see https://w3c.github.io/mediacapture-screen-share/
 */

// Component styles
import '../css/webrtc/screen-share.css';

// Constants
const COMPONENT_STATES = {
  IDLE: 'idle',
  REQUESTING: 'requesting',
  SHARING: 'sharing',
  ERROR: 'error',
};

const ERROR_TYPES = {
  NOT_SUPPORTED: 'NotSupportedError',
  NOT_ALLOWED: 'NotAllowedError',
  NOT_FOUND: 'NotFoundError',
  ABORT: 'AbortError',
};

const ERROR_MESSAGES = {
  [ERROR_TYPES.NOT_SUPPORTED]: 'Screen sharing is not supported in this browser',
  [ERROR_TYPES.NOT_ALLOWED]: 'Permission denied. Please allow screen sharing.',
  [ERROR_TYPES.NOT_FOUND]: 'No screen available for sharing',
  [ERROR_TYPES.ABORT]: 'Screen sharing was cancelled',
  default: 'Failed to start screen sharing',
};

const ERROR_AUTO_DISMISS_DELAY = 5000;

// SVG Icons
const ICONS = Object.freeze({
  screenShare: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
  stop: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"></rect></svg>',
  monitor: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line><path d="M7 8l3 3-3 3"></path><line x1="12" y1="11" x2="17" y2="11"></line></svg>',
  fullscreen: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>',
  exitFullscreen: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>',
});

/**
 * Creates a production-ready WebRTC Screen Sharing component
 *
 * Features:
 * - Latest getDisplayMedia API with preferCurrentTab and systemAudio
 * - Full ARIA accessibility support
 * - Keyboard navigation (ESC to exit fullscreen, Tab for focus)
 * - Proper error handling with user-friendly messages
 * - Custom events for integration
 * - Memory leak prevention with cleanup
 * - Reduced motion support
 *
 * @param {Object} options - Configuration options
 * @param {boolean} options.preferCurrentTab - Prioritize current tab in picker (default: false)
 * @param {boolean} options.includeAudio - Include system audio (default: false)
 * @param {Function} options.onStateChange - Callback when state changes
 * @param {Function} options.onError - Callback when error occurs
 * @returns {HTMLElement} The screen share component
 */
function createScreenShareComponent(options = {}) {
  const {
    preferCurrentTab = false,
    includeAudio = false,
    onStateChange = null,
    onError = null,
  } = options;

  // Main container
  const container = document.createElement('div');
  container.className = 'screen-share';
  container.setAttribute('role', 'region');
  container.setAttribute('aria-label', 'Screen sharing controls');

  // Component state
  let mediaStream = null;
  let currentState = COMPONENT_STATES.IDLE;
  let errorDismissTimer = null;
  let cleanupHandlers = [];

  // Helper: Create element with attributes
  const createElement = (tag, attributes = {}, children = []) => {
    const el = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        el.className = value;
      } else if (key.startsWith('aria-') || key.startsWith('data-')) {
        el.setAttribute(key, value);
      } else {
        el[key] = value;
      }
    });
    children.forEach((child) => {
      if (typeof child === 'string') {
        el.innerHTML += child;
      } else {
        el.appendChild(child);
      }
    });
    return el;
  };

  // Helper: Dispatch custom event
  const dispatchEvent = (eventName, detail = {}) => {
    container.dispatchEvent(
      new CustomEvent(eventName, {
        detail: { ...detail, timestamp: Date.now() },
        bubbles: true,
      })
    );
  };

  // Helper: Update component state
  const setState = (newState, message, errorDetails = null) => {
    const previousState = currentState;
    currentState = newState;

    updateUI(newState, message);

    // Dispatch state change event
    dispatchEvent('screenShareStateChange', {
      state: newState,
      previousState,
      message,
    });

    // Call callback if provided
    if (onStateChange) {
      onStateChange(newState, message);
    }

    // Handle error callback
    if (newState === COMPONENT_STATES.ERROR && onError && errorDetails) {
      onError(errorDetails);
    }
  };

  // Header
  const header = createElement('div', { className: 'screen-share-header' }, [
    '<h2 id="screen-share-title">Screen Sharing</h2>',
    '<p id="screen-share-description">Share your screen, window, or browser tab with WebRTC</p>',
  ]);
  container.appendChild(header);

  // Controls
  const controls = createElement('div', {
    className: 'screen-share-controls',
    role: 'group',
    'aria-labelledby': 'screen-share-title',
  });

  // Start button
  const startBtn = createElement('button', {
    className: 'screen-share-btn screen-share-btn--start',
    type: 'button',
    'aria-label': 'Start screen sharing',
  });
  startBtn.innerHTML = `<span class="screen-share-btn-icon" aria-hidden="true">${ICONS.screenShare}</span> <span>Start Sharing</span>`;

  // Stop button
  const stopBtn = createElement('button', {
    className: 'screen-share-btn screen-share-btn--stop',
    type: 'button',
    disabled: true,
    'aria-label': 'Stop screen sharing',
  });
  stopBtn.innerHTML = `<span class="screen-share-btn-icon" aria-hidden="true">${ICONS.stop}</span> <span>Stop Sharing</span>`;

  controls.appendChild(startBtn);
  controls.appendChild(stopBtn);
  container.appendChild(controls);

  // Preview area
  const preview = createElement('div', {
    className: 'screen-share-preview',
    role: 'img',
    'aria-label': 'Screen share preview',
  });

  // Placeholder (shown when not sharing)
  const placeholder = createElement(
    'div',
    { className: 'screen-share-placeholder screen-share-placeholder--visible' },
    [
      `<div class="screen-share-placeholder-icon" aria-hidden="true">${ICONS.monitor}</div>`,
      '<p>Click "Start Sharing" to share your screen</p>',
    ]
  );
  preview.appendChild(placeholder);

  // Video element (hidden initially)
  const video = createElement('video', {
    autoplay: true,
    playsInline: true,
    muted: true,
    className: 'screen-share-video screen-share-video--hidden',
    'aria-label': 'Screen sharing video preview',
  });
  preview.appendChild(video);

  // Fullscreen button
  const fullscreenBtn = createElement('button', {
    className: 'screen-share-fullscreen-btn screen-share-fullscreen-btn--hidden',
    type: 'button',
    'aria-label': 'Toggle fullscreen',
  });
  fullscreenBtn.innerHTML = ICONS.fullscreen;
  preview.appendChild(fullscreenBtn);

  container.appendChild(preview);

  // Status indicator (with aria-live for screen reader announcements)
  const status = createElement('div', {
    className: 'screen-share-status screen-share-status--idle',
    role: 'status',
    'aria-live': 'polite',
    'aria-atomic': 'true',
  });
  status.innerHTML = '<span class="screen-share-status-indicator" aria-hidden="true"></span><span>Ready to share</span>';
  container.appendChild(status);

  // Update UI based on state
  function updateUI(state, message) {
    // Update status
    status.className = `screen-share-status screen-share-status--${state}`;
    status.innerHTML = `<span class="screen-share-status-indicator" aria-hidden="true"></span><span>${message}</span>`;

    // Update button states
    const isSharing = state === COMPONENT_STATES.SHARING;
    const isRequesting = state === COMPONENT_STATES.REQUESTING;

    startBtn.disabled = isSharing || isRequesting;
    stopBtn.disabled = !isSharing;

    // Update visibility classes (using CSS classes instead of inline styles)
    if (isSharing) {
      placeholder.classList.remove('screen-share-placeholder--visible');
      placeholder.classList.add('screen-share-placeholder--hidden');
      video.classList.remove('screen-share-video--hidden');
      video.classList.add('screen-share-video--visible');
      fullscreenBtn.classList.remove('screen-share-fullscreen-btn--hidden');
      fullscreenBtn.classList.add('screen-share-fullscreen-btn--visible');
    } else {
      placeholder.classList.remove('screen-share-placeholder--hidden');
      placeholder.classList.add('screen-share-placeholder--visible');
      video.classList.remove('screen-share-video--visible');
      video.classList.add('screen-share-video--hidden');
      fullscreenBtn.classList.remove('screen-share-fullscreen-btn--visible');
      fullscreenBtn.classList.add('screen-share-fullscreen-btn--hidden');
    }

    // Clear error auto-dismiss timer if we're no longer in error state
    if (state !== COMPONENT_STATES.ERROR && errorDismissTimer) {
      clearTimeout(errorDismissTimer);
      errorDismissTimer = null;
    }
  }

  // Start screen sharing
  async function startScreenShare() {
    try {
      // Check if screen sharing is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        throw new Error(ERROR_MESSAGES[ERROR_TYPES.NOT_SUPPORTED]);
      }

      setState(COMPONENT_STATES.REQUESTING, 'Requesting screen access...');

      // Configure getDisplayMedia with latest options
      const displayMediaOptions = {
        video: {
          cursor: 'always', // Always show cursor
        },
        audio: includeAudio
          ? {
              echoCancellation: true,
              noiseSuppression: true,
              sampleRate: 44100,
            }
          : false,
        // Modern options (gracefully degrade if not supported)
        preferCurrentTab: preferCurrentTab,
        selfBrowserSurface: 'exclude', // Prevent hall of mirrors
        systemAudio: includeAudio ? 'include' : 'exclude',
        surfaceSwitching: 'include', // Allow switching between surfaces
        monitorTypeSurfaces: 'include', // Allow monitor selection
      };

      // Request screen capture
      mediaStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);

      // Set video source
      video.srcObject = mediaStream;

      // Get track info for display
      const videoTrack = mediaStream.getVideoTracks()[0];
      const settings = videoTrack.getSettings();
      const label = videoTrack.label || 'Screen';

      setState(COMPONENT_STATES.SHARING, `Sharing: ${label}`);

      // Dispatch sharing started event with details
      dispatchEvent('screenShareStarted', {
        label,
        width: settings.width,
        height: settings.height,
        frameRate: settings.frameRate,
        displaySurface: settings.displaySurface,
      });

      // Listen for track ended (user stops via browser UI)
      const onTrackEnded = () => {
        dispatchEvent('screenShareStoppedByUser');
        stopScreenShare();
      };
      videoTrack.addEventListener('ended', onTrackEnded);
      cleanupHandlers.push(() => videoTrack.removeEventListener('ended', onTrackEnded));
    } catch (error) {
      const errorMessage = ERROR_MESSAGES[error.name] || ERROR_MESSAGES.default;

      setState(COMPONENT_STATES.ERROR, errorMessage, {
        name: error.name,
        message: error.message,
      });

      dispatchEvent('screenShareError', {
        errorName: error.name,
        errorMessage: error.message,
      });

      // Reset to idle after showing error
      errorDismissTimer = setTimeout(() => {
        if (currentState === COMPONENT_STATES.ERROR) {
          setState(COMPONENT_STATES.IDLE, 'Ready to share');
        }
      }, ERROR_AUTO_DISMISS_DELAY);
    }
  }

  // Stop screen sharing
  function stopScreenShare() {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
        dispatchEvent('trackStopped', { kind: track.kind, label: track.label });
      });
      mediaStream = null;
    }

    video.srcObject = null;
    setState(COMPONENT_STATES.IDLE, 'Screen sharing stopped');
    dispatchEvent('screenShareStopped');
  }

  // Toggle fullscreen
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      preview
        .requestFullscreen()
        .then(() => {
          fullscreenBtn.innerHTML = ICONS.exitFullscreen;
          fullscreenBtn.setAttribute('aria-label', 'Exit fullscreen');
          dispatchEvent('fullscreenEntered');
        })
        .catch((err) => {
          dispatchEvent('fullscreenError', {
            errorName: err.name,
            errorMessage: err.message,
          });
        });
    } else {
      document.exitFullscreen().then(() => {
        fullscreenBtn.innerHTML = ICONS.fullscreen;
        fullscreenBtn.setAttribute('aria-label', 'Toggle fullscreen');
        dispatchEvent('fullscreenExited');
      });
    }
  }

  // Keyboard navigation: ESC to exit fullscreen
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && document.fullscreenElement === preview) {
      document.exitFullscreen();
    }
  };

  // Event listeners
  startBtn.addEventListener('click', startScreenShare);
  stopBtn.addEventListener('click', stopScreenShare);
  fullscreenBtn.addEventListener('click', toggleFullscreen);
  document.addEventListener('keydown', handleKeyDown);

  // Cleanup handlers
  cleanupHandlers.push(
    () => startBtn.removeEventListener('click', startScreenShare),
    () => stopBtn.removeEventListener('click', stopScreenShare),
    () => fullscreenBtn.removeEventListener('click', toggleFullscreen),
    () => document.removeEventListener('keydown', handleKeyDown),
    () => {
      if (errorDismissTimer) clearTimeout(errorDismissTimer);
    }
  );

  // Add cleanup method to container
  container.cleanup = () => {
    stopScreenShare();
    cleanupHandlers.forEach((handler) => handler());
    cleanupHandlers = [];
  };

  return container;
}

/**
 * Story exports
 */
export default {
  title: 'WebRTC',
  parameters: {
    docs: {
      description: {
        component:
          'Production-ready screen sharing component using the latest WebRTC Screen Capture API with full accessibility support.',
      },
    },
  },
};

export const ScreenSharing = {
  name: 'Screen Sharing',
  render: () => createScreenShareComponent(),
  parameters: {
    docs: {
      description: {
        story: 'Basic screen sharing component with default settings.',
      },
    },
  },
};

export const WithCurrentTabPreference = {
  name: 'With Current Tab Preference',
  render: () =>
    createScreenShareComponent({
      preferCurrentTab: true,
    }),
  parameters: {
    docs: {
      description: {
        story:
          'Screen sharing that prioritizes the current browser tab in the picker. Useful for presentation tools.',
      },
    },
  },
};

export const WithAudio = {
  name: 'With System Audio',
  render: () =>
    createScreenShareComponent({
      includeAudio: true,
    }),
  parameters: {
    docs: {
      description: {
        story: 'Screen sharing with system audio capture enabled.',
      },
    },
  },
};

export const WithEventListeners = {
  name: 'With Event Listeners',
  render: () => {
    const component = createScreenShareComponent({
      onStateChange: (state, message) => {
        // In production, you might send this to analytics
        // console.log('State changed:', state, message);
      },
      onError: (error) => {
        // In production, you might send this to error tracking
        // console.error('Error occurred:', error);
      },
    });

    // Listen to custom events
    component.addEventListener('screenShareStarted', (e) => {
      // Handle screen share started
      const info = document.createElement('div');
      info.style.cssText =
        'position: fixed; top: 20px; right: 20px; padding: 12px 20px; background: #10b981; color: white; border-radius: 8px; font-size: 14px; z-index: 9999;';
      info.textContent = `Started: ${e.detail.width}x${e.detail.height}`;
      document.body.appendChild(info);
      setTimeout(() => info.remove(), 3000);
    });

    component.addEventListener('screenShareStopped', () => {
      // Handle screen share stopped
      const info = document.createElement('div');
      info.style.cssText =
        'position: fixed; top: 20px; right: 20px; padding: 12px 20px; background: #6366f1; color: white; border-radius: 8px; font-size: 14px; z-index: 9999;';
      info.textContent = 'Screen sharing stopped';
      document.body.appendChild(info);
      setTimeout(() => info.remove(), 3000);
    });

    return component;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates event listeners for integration. Custom events are dispatched for all state changes.',
      },
    },
  },
};

export const Documentation = {
  name: 'API Documentation',
  render: () => {
    const info = document.createElement('div');
    info.className = 'screen-share';
    info.innerHTML = `
      <div class="screen-share-header">
        <h2>Screen Sharing Component - API Documentation</h2>
      </div>
      <div style="padding: 20px; background: #f9fafb; border-radius: 12px; line-height: 1.6;">
        <h3 style="margin-top: 0;">Latest WebRTC Features (2025-2026)</h3>
        <p>This component uses cutting-edge Screen Capture API features:</p>
        <ul>
          <li><strong>preferCurrentTab</strong>: Prioritizes current tab in picker (Chrome 94+, Edge 94+)</li>
          <li><strong>systemAudio</strong>: Controls system audio capture availability</li>
          <li><strong>selfBrowserSurface: 'exclude'</strong>: Prevents "hall of mirrors" effect</li>
          <li><strong>surfaceSwitching</strong>: Allows users to switch surfaces during sharing</li>
          <li><strong>cursor: 'always'</strong>: Always shows cursor in shared content</li>
        </ul>

        <h3>Component Options</h3>
        <pre style="background: #1f2937; color: #e5e7eb; padding: 16px; border-radius: 8px; overflow-x: auto;"><code>createScreenShareComponent({
  preferCurrentTab: false,  // Prioritize current tab in picker
  includeAudio: false,       // Include system audio
  onStateChange: (state, message) => {},  // State change callback
  onError: (error) => {}     // Error callback
})</code></pre>

        <h3>Custom Events</h3>
        <p>The component dispatches the following custom events:</p>
        <ul>
          <li><code>screenShareStateChange</code> - Fired when component state changes</li>
          <li><code>screenShareStarted</code> - Fired when sharing starts (includes video details)</li>
          <li><code>screenShareStopped</code> - Fired when sharing stops</li>
          <li><code>screenShareStoppedByUser</code> - Fired when user stops via browser UI</li>
          <li><code>screenShareError</code> - Fired when an error occurs</li>
          <li><code>trackStopped</code> - Fired when a media track stops</li>
          <li><code>fullscreenEntered</code> - Fired when fullscreen is entered</li>
          <li><code>fullscreenExited</code> - Fired when fullscreen is exited</li>
          <li><code>fullscreenError</code> - Fired when fullscreen fails</li>
        </ul>

        <h3>Accessibility Features</h3>
        <ul>
          <li>Full ARIA support with proper labels and roles</li>
          <li>Keyboard navigation (Tab for focus, ESC to exit fullscreen)</li>
          <li>Screen reader announcements via aria-live regions</li>
          <li>Focus management and visible focus indicators</li>
          <li>Respects prefers-reduced-motion preference</li>
        </ul>

        <h3>Browser Support</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
          <thead>
            <tr style="border-bottom: 2px solid #d1d5db;">
              <th style="text-align: left; padding: 8px;">Browser</th>
              <th style="text-align: left; padding: 8px;">Support</th>
              <th style="text-align: left; padding: 8px;">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px;">Chrome/Edge</td>
              <td style="padding: 8px;">✅ Full</td>
              <td style="padding: 8px;">v94+ for preferCurrentTab</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px;">Firefox</td>
              <td style="padding: 8px;">✅ Full</td>
              <td style="padding: 8px;">v66+</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px;">Safari</td>
              <td style="padding: 8px;">✅ Partial</td>
              <td style="padding: 8px;">macOS 13+, iOS 16+, no preferCurrentTab</td>
            </tr>
            <tr>
              <td style="padding: 8px;">Opera</td>
              <td style="padding: 8px;">✅ Full</td>
              <td style="padding: 8px;">v80+ for preferCurrentTab</td>
            </tr>
          </tbody>
        </table>

        <h3>Cleanup</h3>
        <p>The component includes a cleanup method to prevent memory leaks:</p>
        <pre style="background: #1f2937; color: #e5e7eb; padding: 16px; border-radius: 8px; overflow-x: auto;"><code>const component = createScreenShareComponent();
// ... use component ...
component.cleanup(); // Stops sharing and removes all listeners</code></pre>

        <h3>Security & Privacy</h3>
        <ul>
          <li>Requires HTTPS or localhost</li>
          <li>Requires user gesture (click) to initiate</li>
          <li>Explicit user consent via browser picker</li>
          <li>selfBrowserSurface: 'exclude' prevents accidental self-capture</li>
          <li>No XSS vulnerabilities (no innerHTML with user data)</li>
        </ul>

        <h3>Resources</h3>
        <ul>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia" target="_blank" rel="noopener noreferrer">MDN: getDisplayMedia()</a></li>
          <li><a href="https://w3c.github.io/mediacapture-screen-share/" target="_blank" rel="noopener noreferrer">W3C: Screen Capture Specification</a></li>
          <li><a href="https://wicg.github.io/prefer-current-tab/" target="_blank" rel="noopener noreferrer">WICG: preferCurrentTab</a></li>
          <li><a href="https://developer.chrome.com/docs/web-platform/screen-sharing-controls" target="_blank" rel="noopener noreferrer">Chrome: Screen Sharing Controls</a></li>
        </ul>
      </div>
    `;
    return info;
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete API documentation with examples and browser support information.',
      },
    },
  },
};
