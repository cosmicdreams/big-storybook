import '../../css/modern-ui-kit/globals.css';
import '../../css/modern-ui-kit/components.css';

export default {
  title: 'Modern UI Kit/Forms',
  parameters: {
    layout: 'centered',
  },
};

export const Checkboxes = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <input type="checkbox" id="terms" class="ui-checkbox">
        <label for="terms" style="font-size: 0.875rem; font-weight: 500; cursor: pointer;">Accept terms and conditions</label>
      </div>
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <input type="checkbox" id="marketing" class="ui-checkbox" checked>
        <label for="marketing" style="font-size: 0.875rem; font-weight: 500; cursor: pointer;">Opt-in to marketing emails</label>
      </div>
    </div>
  `
};

export const RadioGroups = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; font-weight: 500;">Comfort Level</p>
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <input type="radio" id="r1" name="comfort" class="ui-radio" value="default" checked>
          <label for="r1" style="font-size: 0.875rem; cursor: pointer;">Default</label>
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <input type="radio" id="r2" name="comfort" class="ui-radio" value="comfortable">
          <label for="r2" style="font-size: 0.875rem; cursor: pointer;">Comfortable</label>
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <input type="radio" id="r3" name="comfort" class="ui-radio" value="compact">
          <label for="r3" style="font-size: 0.875rem; cursor: pointer;">Compact</label>
        </div>
      </div>
    </div>
  `
};

export const Sliders = {
  render: (args) => `
    <div style="width: 300px; display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; justify-content: space-between;">
        <label style="font-size: 0.875rem; font-weight: 500;">Volume</label>
        <span style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">${args.value}</span>
      </div>
      <input type="range" class="ui-slider" value="${args.value}" min="0" max="100">
    </div>
  `,
  args: {
    value: 50
  }
};

export const InputOTP = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div style="text-align: center;">
        <h3 style="margin: 0; font-size: 1.25rem; font-weight: 600;">One-Time Password</h3>
        <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); margin-top: 0.25rem;">Please enter the 6-digit code sent to your email.</p>
      </div>
      <div class="ui-otp-container" style="justify-content: center;">
        <div class="ui-otp-group">
          <input class="ui-otp-input" maxlength="1" pattern="\\d*" inputmode="numeric">
          <input class="ui-otp-input" maxlength="1" pattern="\\d*" inputmode="numeric">
          <input class="ui-otp-input" maxlength="1" pattern="\\d*" inputmode="numeric">
        </div>
        <div class="ui-otp-separator"></div>
        <div class="ui-otp-group">
          <input class="ui-otp-input" maxlength="1" pattern="\\d*" inputmode="numeric">
          <input class="ui-otp-input" maxlength="1" pattern="\\d*" inputmode="numeric">
          <input class="ui-otp-input" maxlength="1" pattern="\\d*" inputmode="numeric">
        </div>
      </div>
    </div>
  `
};
