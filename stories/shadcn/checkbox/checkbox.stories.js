import '../../../src/components/shadcn/checkbox/checkbox.css';
import checkboxHtml from '../../../src/components/shadcn/checkbox/checkbox.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Checkbox',
  parameters: {
    layout: 'centered',
  },
};

export const Examples = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '1rem';

    const options = [
      { label: 'Accept terms and conditions', id: 'terms' },
      { label: 'Opt-in to marketing emails', id: 'marketing', checked: true },
    ];

    options.forEach((opt) => {
      const item = document.createElement('div');
      item.style.display = 'flex';
      item.style.alignItems = 'center';
      item.style.gap = '0.75rem';

      const chkWrapper = document.createElement('div');
      chkWrapper.innerHTML = checkboxHtml;
      const chk = chkWrapper.querySelector('input');
      chk.id = opt.id;
      if (opt.checked) {
        chk.checked = true;
      }

      const label = document.createElement('label');
      label.htmlFor = opt.id;
      label.style.fontSize = '0.875rem';
      label.style.fontWeight = '500';
      label.style.cursor = 'pointer';
      label.innerText = opt.label;

      item.appendChild(chkWrapper);
      item.appendChild(label);
      container.appendChild(item);
    });

    return container;
  },
};
