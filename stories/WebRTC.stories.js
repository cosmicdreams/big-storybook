/**
 * WebRTC Stories - CSF3 Format
 */

import { expect, userEvent, within, fn, spyOn } from 'storybook/test';
import { createScreenShareComponent } from './brightview/webrtc-screen-share';
import '../css/webrtc/screen-share.css';

/**
 * Robust mock for navigator.mediaDevices.getDisplayMedia
 * This ensures tests pass even in environments that don't support the API.
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
        this.start = fn(() => { this.state = 'recording'; });
        this.stop = fn(() => {
          this.state = 'inactive';
          if (this.onstop) this.onstop();
        });
      }
    };
  } else {
    spyOn(window, 'MediaRecorder').mockImplementation(() => ({
      state: 'inactive',
      start: fn(function () { this.state = 'recording'; }),
      stop: fn(function () {
        this.state = 'inactive';
        if (this.onstop) this.onstop();
      }),
      ondataavailable: null,
      onstop: null,
    }));
  }

  return { mockStream, mockTrack };
};

export default {
  title: 'WebRTC',
  parameters: {
    docs: {
      description: {
        component: 'Production-ready screen sharing component with recording and full accessibility support.',
      },
    },
  },
};

export const ScreenSharing = {
  name: 'Screen Sharing & Recording',
  render: (args) => createScreenShareComponent(args),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const startBtn = canvas.getByRole('button', { name: /start.*sharing/i });
    const stopBtn = canvas.getByRole('button', { name: /stop/i });
    const recordBtn = canvas.getByRole('button', { name: /record/i });
    const status = canvas.getByRole('status');

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

export const WithoutRecording = {
  render: () => createScreenShareComponent({ enableRecording: false }),
};
