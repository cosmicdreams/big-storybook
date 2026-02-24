import '../../../src/components/shadcn/menubar/menubar.css';
import menubarHtml from '../../../src/components/shadcn/menubar/menubar.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Menubar',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = menubarHtml;
    const bar = container.querySelector('.ui-menubar');

    ['File', 'Edit', 'View', 'Profiles'].forEach((label) => {
      const trigger = document.createElement('div');
      trigger.className = 'ui-menubar-trigger';
      trigger.innerText = label;
      bar.appendChild(trigger);
    });

    return container;
  },
};
