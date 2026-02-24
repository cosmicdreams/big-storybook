import '../../../src/components/shadcn/input/input.css';
import inputHtml from '../../../src/components/shadcn/input/input.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Input',
  parameters: {
    layout: 'centered',
  },
};

export const Examples = {
  render: () => {
    const container = document.createElement('div');
    container.style.width = '300px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '1.5rem';

    const fields = [
      { label: 'Email', type: 'email', placeholder: 'm@example.com' },
      { label: 'Password', type: 'password', value: 'password123' },
      { label: 'Disabled', type: 'text', placeholder: "Can't touch this", disabled: true },
    ];

    fields.forEach((field) => {
      const fieldWrapper = document.createElement('div');
      fieldWrapper.style.display = 'flex';
      fieldWrapper.style.flexDirection = 'column';
      fieldWrapper.style.gap = '0.5rem';

      const label = document.createElement('label');
      label.style.fontSize = '0.875rem';
      label.style.fontWeight = '500';
      label.innerText = field.label;

      const inputWrapper = document.createElement('div');
      inputWrapper.innerHTML = inputHtml;
      const input = inputWrapper.querySelector('input');
      input.type = field.type;
      if (field.placeholder) {
        input.placeholder = field.placeholder;
      }
      if (field.value) {
        input.value = field.value;
      }
      if (field.disabled) {
        input.disabled = true;
      }

      fieldWrapper.appendChild(label);
      fieldWrapper.appendChild(inputWrapper);
      container.appendChild(fieldWrapper);
    });

    return container;
  },
};
