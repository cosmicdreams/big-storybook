import '../../../src/components/shadcn/progress/progress.css';
import progressHtml from '../../../src/components/shadcn/progress/progress.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Progress',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.width = '300px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '1rem';

    const prgWrapper = document.createElement('div');
    prgWrapper.innerHTML = progressHtml;
    const value = prgWrapper.querySelector('.ui-progress-value');
    value.style.transform = `translateX(-${100 - args.value}%)`;

    container.appendChild(prgWrapper);
    container.innerHTML += `<p style="font-size: 0.875rem; text-align: center;">${args.value}% complete</p>`;
    return container;
  },
  args: {
    value: 60,
  },
};
