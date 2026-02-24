import '../../../src/components/shadcn/otp-input/otp-input.css';
import otpInputHtml from '../../../src/components/shadcn/otp-input/otp-input.html?raw';
import { initOTP } from '../../../src/components/shadcn/otp-input/otp-input.js';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Input OTP',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '1.5rem';

    container.innerHTML = `
      <div style="text-align: center;">
        <h3 style="margin: 0; font-size: 1.25rem; font-weight: 600;">One-Time Password</h3>
        <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); margin-top: 0.25rem;">Please enter the 6-digit code sent to your email.</p>
      </div>
    `;

    const otpWrapper = document.createElement('div');
    otpWrapper.innerHTML = otpInputHtml;
    otpWrapper.style.display = 'flex';
    otpWrapper.style.justifyContent = 'center';

    initOTP(otpWrapper, 6);

    container.appendChild(otpWrapper);
    return container;
  },
};
