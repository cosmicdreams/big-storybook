import '../../../src/components/codepen/aurora-text/aurora-text.css';
import auroraTextHtml from '../../../src/components/codepen/aurora-text/aurora-text.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Codepen/Aurora Text',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.style.textAlign = 'center';
    container.innerHTML = auroraTextHtml;
    container.querySelector('h1').innerText = 'AESTHETIC';
    container.innerHTML += `
      <p style="margin-top: 1rem; color: #64748b; font-weight: 500;">Native CSS Animated Gradients</p>
    `;
    return container;
  },
};
