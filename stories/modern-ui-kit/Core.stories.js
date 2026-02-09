import '../../css/modern-ui-kit/globals.css';
import '../../css/modern-ui-kit/components.css';

export default {
    title: 'Modern UI Kit/Core',
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
        },
        size: {
            control: 'select',
            options: ['default', 'sm', 'lg', 'icon'],
        }
    }
};

export const Buttons = {
    render: (args) => `
    <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
        <button class="ui-button ui-button-primary">Primary</button>
        <button class="ui-button ui-button-secondary">Secondary</button>
        <button class="ui-button ui-button-outline">Outline</button>
        <button class="ui-button ui-button-ghost">Ghost</button>
        <button class="ui-button ui-button-destructive">Destructive</button>
      </div>
      <div style="display: flex; gap: 1rem; align-items: center;">
        <button class="ui-button ui-button-primary" style="height: 2.25rem; padding: 0 0.75rem; font-size: 0.75rem;">Small</button>
        <button class="ui-button ui-button-primary">Default</button>
        <button class="ui-button ui-button-primary" style="height: 2.75rem; padding: 0 2rem; font-size: 1rem;">Large</button>
      </div>
    </div>
  `
};

export const Badges = {
    render: () => `
    <div style="display: flex; gap: 1rem;">
      <span class="ui-badge ui-badge-default">Default</span>
      <span class="ui-badge ui-badge-secondary">Secondary</span>
      <span class="ui-badge ui-badge-outline">Outline</span>
      <span class="ui-badge ui-badge-destructive">Destructive</span>
    </div>
  `
};

export const Inputs = {
    render: (args) => `
    <div style="width: 300px; display: flex; flex-direction: column; gap: 1.5rem;">
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <label style="font-size: 0.875rem; font-weight: 500;">Email</label>
        <input type="email" class="ui-input" placeholder="m@example.com">
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <label style="font-size: 0.875rem; font-weight: 500;">Password</label>
        <input type="password" class="ui-input" value="password123">
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <label style="font-size: 0.875rem; font-weight: 500;">Disabled</label>
        <input type="text" class="ui-input" placeholder="Can't touch this" disabled>
      </div>
    </div>
  `
};

export const Switches = {
    render: () => `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div style="display: flex; align-items: center; gap: 2rem; justify-content: space-between; width: 250px;">
        <label style="font-size: 0.875rem; font-weight: 500; cursor: pointer;" for="s1">Airplane Mode</label>
        <input type="checkbox" id="s1" class="ui-switch">
      </div>
      <div style="display: flex; align-items: center; gap: 2rem; justify-content: space-between; width: 250px;">
        <label style="font-size: 0.875rem; font-weight: 500; cursor: pointer;" for="s2">Bluetooth</label>
        <input type="checkbox" id="s2" class="ui-switch" checked>
      </div>
      <div style="display: flex; align-items: center; gap: 2rem; justify-content: space-between; width: 250px; opacity: 0.5;">
        <label style="font-size: 0.875rem; font-weight: 500;" for="s3">Disabled</label>
        <input type="checkbox" id="s3" class="ui-switch" disabled>
      </div>
    </div>
  `
};

export const Cards = {
    render: (args) => `
    <div class="ui-card" style="width: 380px;">
      <div class="ui-card-header">
        <h3 class="ui-card-title">${args.title}</h3>
        <p class="ui-card-description">${args.description}</p>
      </div>
      <div class="ui-card-content">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="display: flex; flex-direction: column; gap: 0.25rem;">
            <label style="font-size: 0.75rem; font-weight: 500; color: hsl(var(--muted-foreground));">USERNAME</label>
            <input type="text" class="ui-input" placeholder="@shadcn">
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.25rem;">
            <label style="font-size: 0.75rem; font-weight: 500; color: hsl(var(--muted-foreground));">BIO</label>
            <textarea class="ui-input" style="height: 80px; resize: none;" placeholder="Tell us about yourself..."></textarea>
          </div>
        </div>
      </div>
      <div class="ui-card-footer" style="justify-content: flex-end;">
        <button class="ui-button ui-button-primary">Save Changes</button>
      </div>
    </div>
  `,
    args: {
        title: 'Edit Profile',
        description: 'Make changes to your profile here. Click save when you\'re done.'
    }
};
