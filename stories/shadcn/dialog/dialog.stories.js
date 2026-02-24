import '../../../src/components/shadcn/dialog/dialog.css';
import dialogHtml from '../../../src/components/shadcn/dialog/dialog.html?raw';
import '../../../src/components/shadcn/button/button.css';
import buttonHtml from '../../../src/components/shadcn/button/button.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Dialog',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => {
    const container = document.createElement('div');

    const openBtnWrapper = document.createElement('div');
    openBtnWrapper.innerHTML = buttonHtml;
    const openBtn = openBtnWrapper.querySelector('button');
    openBtn.classList.add('ui-button-outline');
    openBtn.innerText = 'Open Dialog';

    const dialogWrapper = document.createElement('div');
    dialogWrapper.innerHTML = dialogHtml;
    const dialog = dialogWrapper.querySelector('dialog');
    dialog.querySelector('.ui-dialog-title').innerText = 'Are you absolutely sure?';
    dialog.querySelector('.ui-dialog-description').innerText = 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.';

    const footer = dialog.querySelector('.ui-dialog-footer');
    footer.innerHTML = '';

    const cancelBtnWrapper = document.createElement('div');
    cancelBtnWrapper.innerHTML = buttonHtml;
    const cancelBtn = cancelBtnWrapper.querySelector('button');
    cancelBtn.classList.add('ui-button-outline');
    cancelBtn.innerText = 'Cancel';

    const confirmBtnWrapper = document.createElement('div');
    confirmBtnWrapper.innerHTML = buttonHtml;
    const confirmBtn = confirmBtnWrapper.querySelector('button');
    confirmBtn.classList.add('ui-button-destructive');
    confirmBtn.innerText = 'Continue';

    footer.appendChild(cancelBtnWrapper);
    footer.appendChild(confirmBtnWrapper);

    openBtn.onclick = () => dialog.showModal();
    cancelBtn.onclick = () => dialog.close();

    container.appendChild(openBtnWrapper);
    container.appendChild(dialogWrapper);

    return container;
  },
};
