import '../../../src/components/shadcn/radio/radio.css';
import radioHtml from '../../../src/components/shadcn/radio/radio.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Radio',
  parameters: {
    layout: 'centered',
  },
};

export const Group = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '1rem';

    const title = document.createElement('p');
    title.style.fontSize = '0.875rem';
    title.style.fontWeight = '500';
    title.innerText = 'Comfort Level';
    container.appendChild(title);

    const group = document.createElement('div');
    group.style.display = 'flex';
    group.style.flexDirection = 'column';
    group.style.gap = '0.75rem';

    const options = [
      { label: 'Default', id: 'r1', value: 'default', checked: true },
      { label: 'Comfortable', id: 'r2', value: 'comfortable' },
      { label: 'Compact', id: 'r3', value: 'compact' },
    ];

    options.forEach((opt) => {
      const item = document.createElement('div');
      item.style.display = 'flex';
      item.style.alignItems = 'center';
      item.style.gap = '0.75rem';

      const rdWrapper = document.createElement('div');
      rdWrapper.innerHTML = radioHtml;
      const rd = rdWrapper.querySelector('input');
      rd.id = opt.id;
      rd.name = 'comfort';
      rd.value = opt.value;
      if (opt.checked) {
        rd.checked = true;
      }

      const label = document.createElement('label');
      label.htmlFor = opt.id;
      label.style.fontSize = '0.875rem';
      label.style.cursor = 'pointer';
      label.innerText = opt.label;

      item.appendChild(rdWrapper);
      item.appendChild(label);
      group.appendChild(item);
    });

    container.appendChild(group);
    return container;
  },
};
