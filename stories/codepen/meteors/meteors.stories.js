import '../../../src/components/codepen/meteors/meteors.css';
import meteorsHtml from '../../../src/components/codepen/meteors/meteors.html?raw';
import { initMeteors } from '../../../src/components/codepen/meteors/meteors.js';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Codepen/Meteors',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: (args) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
        position: relative;
        width: 600px;
        height: 300px;
        background: #0f172a;
        border-radius: var(--radius);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    `;

    wrapper.innerHTML = meteorsHtml;
    const meteorContainer = wrapper.querySelector('.premium-meteors-container');
    initMeteors(meteorContainer, args.count);

    wrapper.innerHTML += `
        <h2 style="color: white; font-weight: 800; z-index: 10; font-size: 2.5rem; letter-spacing: -0.05em;">METEORS</h2>
    `;

    return wrapper;
  },
  args: {
    count: 20,
  },
};
