import '../../css/modern-ui-kit/globals.css';
import '../../css/modern-ui-kit/components.css';

export default {
    title: 'Modern UI Kit/Overlays',
    parameters: {
        layout: 'centered',
    },
};

export const Dialogs = {
    render: () => {
        const container = document.createElement('div');
        container.innerHTML = `
      <button class="ui-button ui-button-outline" id="open-dialog">Open Dialog</button>
      <dialog class="ui-dialog" id="my-dialog">
        <div class="ui-dialog-content">
          <div class="ui-dialog-header">
            <h2 class="ui-card-title">Are you absolutely sure?</h2>
            <p class="ui-card-description">This action cannot be undone. This will permanently delete your account and remove your data from our servers.</p>
          </div>
          <div class="ui-dialog-footer">
            <button class="ui-button ui-button-outline" id="close-dialog">Cancel</button>
            <button class="ui-button ui-button-destructive">Continue</button>
          </div>
        </div>
      </dialog>
    `;

        const btn = container.querySelector('#open-dialog');
        const dialog = container.querySelector('#my-dialog');
        const close = container.querySelector('#close-dialog');

        btn.onclick = () => dialog.showModal();
        close.onclick = () => dialog.close();

        return container;
    }
};

export const CommandMenus = {
    render: () => `
    <div class="ui-command">
      <input class="ui-command-input" placeholder="Type a command or search...">
      <div class="ui-command-group">
        <div class="ui-command-label">Suggestions</div>
        <div class="ui-command-item"><span>📅</span> Calendar</div>
        <div class="ui-command-item"><span>😀</span> Search Emoji</div>
        <div class="ui-command-item"><span>⚙️</span> Settings</div>
      </div>
      <div class="ui-separator"></div>
      <div class="ui-command-group">
        <div class="ui-command-label">Settings</div>
        <div class="ui-command-item"><span>👤</span> Profile</div>
        <div class="ui-command-item"><span>💳</span> Billing</div>
        <div class="ui-command-item"><span>🔑</span> Shortcuts</div>
      </div>
    </div>
  `
};

export const Accordions = {
    render: () => `
    <div class="ui-accordion" style="width: 450px;">
      <details class="ui-accordion-item" name="shadcn-acc">
        <summary class="ui-accordion-trigger">Is it accessible? <span>▼</span></summary>
        <div class="ui-accordion-content">Yes. It adheres to the WAI-ARIA design pattern.</div>
      </details>
      <details class="ui-accordion-item" name="shadcn-acc">
        <summary class="ui-accordion-trigger">Is it styled? <span>▼</span></summary>
        <div class="ui-accordion-content">Yes. It comes with default styles that matches the other components' aesthetic.</div>
      </details>
      <details class="ui-accordion-item" name="shadcn-acc">
        <summary class="ui-accordion-trigger">Is it animated? <span>▼</span></summary>
        <div class="ui-accordion-content">Yes. It uses native Baseline features for smooth transitions.</div>
      </details>
    </div>
  `
};

export const Tooltips = {
    render: () => `
    <div style="padding: 2rem;">
        <button class="ui-button ui-button-outline" style="anchor-name: --my-anchor;">Hover me</button>
        <div class="ui-tooltip" style="position: fixed; position-anchor: --my-anchor; top: anchor(top); left: anchor(right); margin-left: 8px;">
            Add to library
        </div>
        <p style="font-size: 0.75rem; color: #666; margin-top: 1rem;">(Requires Anchor Positioning support)</p>
    </div>
  `
};

export const Toasts = {
    render: () => {
        const container = document.createElement('div');
        container.innerHTML = `
      <button class="ui-button ui-button-outline" id="show-toast">Add to calendar</button>
      <div class="ui-toast-container" id="toast-root"></div>
    `;

        const btn = container.querySelector('#show-toast');
        const root = container.querySelector('#toast-root');

        btn.onclick = () => {
            const toast = document.createElement('div');
            toast.className = 'ui-toast';
            toast.innerHTML = `
        <div class="ui-toast-title">Scheduled: Catch up</div>
        <div class="ui-toast-description">Friday, February 10, 2024 at 5:57 PM</div>
      `;
            root.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        };

        return container;
    }
};
