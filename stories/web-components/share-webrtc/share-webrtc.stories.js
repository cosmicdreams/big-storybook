/**
 * WebRTC Stories - CSF3 Format
 */

import { expect, userEvent, within, fn, spyOn } from 'storybook/test';
import '../../../src/components/web-components/share-webrtc/share-webrtc.js';

/**
 * Robust mock for navigator.mediaDevices.getDisplayMedia
 */
const setupMediaMock = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const mockStream = canvas.captureStream(1);
  const mockTrack = mockStream.getVideoTracks()[0];

  Object.defineProperty(mockTrack, 'label', {
    value: 'Mock Screen',
    configurable: true,
  });
  Object.defineProperty(mockTrack, 'readyState', {
    value: 'live',
    configurable: true,
    writable: true,
  });
  mockTrack.stop = fn(() => {
    mockTrack.readyState = 'ended';
  });
  mockTrack.getSettings = () => ({ width: 1920, height: 1080, displaySurface: 'monitor' });

  if (!navigator.mediaDevices) {
    Object.defineProperty(navigator, 'mediaDevices', {
      value: { getDisplayMedia: async () => mockStream },
      configurable: true,
      writable: true,
    });
  } else {
    spyOn(navigator.mediaDevices, 'getDisplayMedia').mockResolvedValue(mockStream);
  }

  // Mock MediaRecorder
  if (typeof window.MediaRecorder === 'undefined') {
    window.MediaRecorder = class MockMediaRecorder {
      constructor() {
        this.state = 'inactive';
        this.start = fn(() => {
          this.state = 'recording';
        });
        this.stop = fn(() => {
          this.state = 'inactive';
          if (this.onstop) {
            this.onstop();
          }
        });
      }
    };
  } else {
    try {
      spyOn(window, 'MediaRecorder').mockImplementation(() => ({
        state: 'inactive',
        start: fn(function () {
          this.state = 'recording';
        }),
        stop: fn(function () {
          this.state = 'inactive';
          if (this.onstop) {
            this.onstop();
          }
        }),
        ondataavailable: null,
        onstop: null,
      }));
    } catch (e) {
      // Fallback for environments where spyOn window fails
    }
  }

  return { mockStream, mockTrack };
};

export default {
  title: 'Web Components/Share WebRTC',
  parameters: {
    docs: {
      description: {
        component: 'Production-ready screen sharing component built as a native Web Component (`<share-webrtc>`).',
      },
    },
  },
};

export const ScreenSharing = {
  name: 'Screen Sharing & Recording',
  render: () => '<share-webrtc></share-webrtc>',
  play: async ({ canvasElement, step }) => {
    const component = canvasElement.querySelector('share-webrtc');
    // Wait for shadow root to be populated
    await new Promise((resolve) => {
      const check = () => {
        if (component.shadowRoot && component.shadowRoot.getElementById('startBtn')) {
          resolve();
        } else {
          setTimeout(check, 50);
        }
      };
      check();
    });

    const root = within(component.shadowRoot);
    const startBtn = component.shadowRoot.getElementById('startBtn');
    const stopBtn = component.shadowRoot.getElementById('stopBtn');
    const recordBtn = component.shadowRoot.getElementById('recordBtn');
    const status = component.shadowRoot.getElementById('status');

    setupMediaMock();

    await step('Initial state is idle', async () => {
      await expect(startBtn).not.toBeDisabled();
      await expect(recordBtn).toBeDisabled();
      await expect(stopBtn).toBeDisabled();
      await expect(status).toHaveTextContent(/ready/i);
    });

    await step('Start sharing transitions to sharing state', async () => {
      await userEvent.click(startBtn);
      await expect(status).toHaveTextContent(/sharing: mock screen/i);
      await expect(startBtn).toBeDisabled();
      await expect(recordBtn).not.toBeDisabled();
      await expect(stopBtn).not.toBeDisabled();
    });

    await step('Start recording transitions to recording state', async () => {
      await userEvent.click(recordBtn);
      await expect(status).toHaveTextContent(/recording/i);
      await expect(recordBtn).toHaveClass('screen-share-btn--recording');
    });

    await step('Stop recording returns to sharing state', async () => {
      await userEvent.click(recordBtn);
      await expect(status).toHaveTextContent(/sharing/i);
      await expect(recordBtn).not.toHaveClass('screen-share-btn--recording');
    });

    await step('Stop sharing returns to idle state', async () => {
      await userEvent.click(stopBtn);
      await expect(status).toHaveTextContent(/stopped/i);
      await expect(startBtn).not.toBeDisabled();
      await expect(recordBtn).toBeDisabled();
      await expect(stopBtn).toBeDisabled();
    });
  },
};
