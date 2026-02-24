import '../../../src/components/shadcn/tabs/tabs.css';
import tabsHtml from '../../../src/components/shadcn/tabs/tabs.html?raw';
import { initTabs } from '../../../src/components/shadcn/tabs/tabs.js';
import '../../../src/components/shadcn/card/card.css';
import cardHtml from '../../../src/components/shadcn/card/card.html?raw';
import '../../../src/components/shadcn/button/button.css';
import buttonHtml from '../../../src/components/shadcn/button/button.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Tabs',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.style.width = '400px';
    container.innerHTML = tabsHtml;

    const list = container.querySelector('.ui-tabs-list');
    list.innerHTML = `
        <button class="ui-tabs-trigger active" data-tab="account">Account</button>
        <button class="ui-tabs-trigger" data-tab="password">Password</button>
    `;

    const contentContainer = container.querySelector('.ui-tabs-content-container');

    // Account Tab
    const accTab = document.createElement('div');
    accTab.className = 'ui-tabs-content';
    accTab.id = 'account';
    accTab.innerHTML = cardHtml;
    const accCard = accTab.querySelector('.ui-card');
    accCard.querySelector('.ui-card-title').innerText = 'Account';
    accCard.querySelector('.ui-card-description').innerText = 'Make changes to your account here. Click save when you\'re done.';
    accCard.querySelector('.ui-card-content').innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <label style="font-size: 0.875rem; font-weight: 500;">Name</label>
            <input class="ui-input" value="Pedro Duarte" style="width: 100%; height: 2.5rem; border: 1px solid hsl(var(--input)); border-radius: var(--radius); padding: 0 0.75rem;">
        </div>
    `;
    const accFooter = accCard.querySelector('.ui-card-footer');
    accFooter.innerHTML = buttonHtml;
    accFooter.querySelector('button').classList.add('ui-button-primary');
    accFooter.querySelector('button').innerText = 'Save changes';

    // Password Tab
    const pwdTab = document.createElement('div');
    pwdTab.className = 'ui-tabs-content';
    pwdTab.id = 'password';
    pwdTab.style.display = 'none';
    pwdTab.innerHTML = cardHtml;
    const pwdCard = pwdTab.querySelector('.ui-card');
    pwdCard.querySelector('.ui-card-title').innerText = 'Password';
    pwdCard.querySelector('.ui-card-description').innerText = 'Change your password here. After saving, you\'ll be logged out.';
    pwdCard.querySelector('.ui-card-content').innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <label style="font-size: 0.875rem; font-weight: 500;">New password</label>
            <input type="password" class="ui-input" style="width: 100%; height: 2.5rem; border: 1px solid hsl(var(--input)); border-radius: var(--radius); padding: 0 0.75rem;">
        </div>
    `;
    const pwdFooter = pwdCard.querySelector('.ui-card-footer');
    pwdFooter.innerHTML = buttonHtml;
    pwdFooter.querySelector('button').classList.add('ui-button-primary');
    pwdFooter.querySelector('button').innerText = 'Save password';

    contentContainer.appendChild(accTab);
    contentContainer.appendChild(pwdTab);

    initTabs(container);
    return container;
  },
};
