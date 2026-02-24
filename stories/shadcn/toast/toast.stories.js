import '../../../src/components/shadcn/toast/toast.css';
import toastHtml from '../../../src/components/shadcn/toast/toast.html?raw';
import { showToast } from '../../../src/components/shadcn/toast/toast.js';
import '../../../src/components/shadcn/button/button.css';
import buttonHtml from '../../../src/components/shadcn/button/button.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Toast',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => {
    const container = document.createElement('div');

    const btnWrapper = document.createElement('div');
    btnWrapper.innerHTML = buttonHtml;
    const btn = btnWrapper.querySelector('button');
    btn.classList.add('ui-button-outline');
    btn.innerText = 'Add to calendar';

    btn.onclick = () => {
      showToast(
        'Scheduled: Catch up',
        'Friday, February 10, 2024 at 5:57 PM',
        toastHtml,
      );
    };

    container.appendChild(btnWrapper);
    return container;
  },
};
