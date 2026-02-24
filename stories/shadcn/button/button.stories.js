import '../../../src/components/shadcn/button/button.css';
import buttonHtml from '../../../src/components/shadcn/button/button.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Button',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};

export const Variants = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '1rem';
    container.style.flexWrap = 'wrap';
    container.style.justifyContent = 'center';

    const variants = ['primary', 'secondary', 'outline', 'ghost', 'destructive'];
    variants.forEach((variant) => {
      const btnWrapper = document.createElement('div');
      btnWrapper.innerHTML = buttonHtml;
      const btn = btnWrapper.querySelector('button');
      btn.classList.add(`ui-button-${variant}`);
      btn.innerText = variant.charAt(0).toUpperCase() + variant.slice(1);
      container.appendChild(btnWrapper);
    });

    return container;
  },
};

export const Sizes = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '1rem';
    container.style.alignItems = 'center';

    const sizes = [
      { name: 'Small', style: 'height: 2.25rem; padding: 0 0.75rem; font-size: 0.75rem;' },
      { name: 'Default', style: '' },
      { name: 'Large', style: 'height: 2.75rem; padding: 0 2rem; font-size: 1rem;' },
    ];

    sizes.forEach((size) => {
      const btnWrapper = document.createElement('div');
      btnWrapper.innerHTML = buttonHtml;
      const btn = btnWrapper.querySelector('button');
      btn.classList.add('ui-button-primary');
      if (size.style) {
        btn.style.cssText = size.style;
      }
      btn.innerText = size.name;
      container.appendChild(btnWrapper);
    });

    return container;
  },
};
