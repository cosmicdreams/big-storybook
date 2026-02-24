import '../../../src/components/shadcn/command-menu/command-menu.css';
import commandMenuHtml from '../../../src/components/shadcn/command-menu/command-menu.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Command Menu',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = commandMenuHtml;

    const groupContainer = container.querySelector('.ui-command-group');
    groupContainer.innerHTML = `
        <div class="ui-command-label">Suggestions</div>
        <div class="ui-command-item"><span>📅</span> Calendar</div>
        <div class="ui-command-item"><span>😀</span> Search Emoji</div>
        <div class="ui-command-item"><span>⚙️</span> Settings</div>
        <div class="ui-separator" style="background-color: hsl(var(--border)); height: 1px; width: 100%; margin: 0.5rem 0;"></div>
        <div class="ui-command-label">Settings</div>
        <div class="ui-command-item"><span>👤</span> Profile</div>
        <div class="ui-command-item"><span>💳</span> Billing</div>
        <div class="ui-command-item"><span>🔑</span> Shortcuts</div>
    `;

    return container;
  },
};
