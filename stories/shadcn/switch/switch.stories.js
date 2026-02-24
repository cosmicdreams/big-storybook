import '../../../src/components/shadcn/switch/switch.css';
import switchHtml from '../../../src/components/shadcn/switch/switch.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Switch',
  parameters: {
    layout: 'centered',
  },
};

export const Examples = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '1.5rem';

    const options = [
      { label: 'Airplane Mode', id: 's1' },
      { label: 'Bluetooth', id: 's2', checked: true },
      { label: 'Disabled', id: 's3', disabled: true },
    ];

    options.forEach((opt) => {
      const swWrapper = document.createElement('div');
      swWrapper.style.display = 'flex';
      swWrapper.style.alignItems = 'center';
      swWrapper.style.gap = '2rem';
      swWrapper.style.justifyContent = 'space-between';
      swWrapper.style.width = '250px';
      if (opt.disabled) {
        swWrapper.style.opacity = '0.5';
      }

      const label = document.createElement('label');
      label.style.fontSize = '0.875rem';
      label.style.fontWeight = '500';
      label.style.cursor = 'pointer';
      label.htmlFor = opt.id;
      label.innerText = opt.label;

      const inputWrapper = document.createElement('div');
      inputWrapper.innerHTML = switchHtml;
      const input = inputWrapper.querySelector('input');
      input.id = opt.id;
      if (opt.checked) {
        input.checked = true;
      }
      if (opt.disabled) {
        input.disabled = true;
      }

      swWrapper.appendChild(label);
      swWrapper.appendChild(inputWrapper);
      container.appendChild(swWrapper);
    });

    return container;
  },
};
