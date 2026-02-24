import '../../../src/components/shadcn/tooltip/tooltip.css';
import tooltipHtml from '../../../src/components/shadcn/tooltip/tooltip.html?raw';
import '../../../src/components/shadcn/button/button.css';
import buttonHtml from '../../../src/components/shadcn/button/button.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Tooltip',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '2rem';

    const btnWrapper = document.createElement('div');
    btnWrapper.innerHTML = buttonHtml;
    const btn = btnWrapper.querySelector('button');
    btn.classList.add('ui-button-outline');
    btn.innerText = 'Hover me';
    btn.style.anchorName = '--my-anchor';

    const ttWrapper = document.createElement('div');
    ttWrapper.innerHTML = tooltipHtml;
    const tt = ttWrapper.querySelector('.ui-tooltip');
    tt.innerText = 'Add to library';
    tt.style.cssText = `
        position: fixed;
        position-anchor: --my-anchor;
        top: anchor(top);
        left: anchor(right);
        margin-left: 8px;
    `;

    container.appendChild(btnWrapper);
    container.appendChild(ttWrapper);
    container.innerHTML += '<p style="font-size: 0.75rem; color: #666; margin-top: 1rem;">(Requires Anchor Positioning support)</p>';

    return container;
  },
};
