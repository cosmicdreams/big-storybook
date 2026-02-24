import '../../../src/components/shadcn/badge/badge.css';
import badgeHtml from '../../../src/components/shadcn/badge/badge.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Badge',
  parameters: {
    layout: 'centered',
  },
};

export const Variants = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '1rem';

    const variants = ['default', 'secondary', 'outline', 'destructive'];
    variants.forEach((variant) => {
      const badgeWrapper = document.createElement('div');
      badgeWrapper.innerHTML = badgeHtml;
      const badge = badgeWrapper.querySelector('span');
      badge.classList.add(`ui-badge-${variant}`);
      badge.innerText = variant.charAt(0).toUpperCase() + variant.slice(1);
      container.appendChild(badgeWrapper);
    });

    return container;
  },
};
