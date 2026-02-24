import '../../../src/components/codepen/shimmer-button/shimmer-button.css';
import shimmerButtonHtml from '../../../src/components/codepen/shimmer-button/shimmer-button.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Codepen/Shimmer Button',
  parameters: {
    layout: 'centered',
  },
};

export const Variants = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '2rem';

    const btn1 = document.createElement('div');
    btn1.innerHTML = shimmerButtonHtml;
    btn1.querySelector('button').innerText = 'Shimmer Dark';

    const btn2 = document.createElement('div');
    btn2.innerHTML = shimmerButtonHtml;
    const b2 = btn2.querySelector('button');
    b2.innerText = 'Shimmer Purple';
    b2.style.setProperty('--bg-color', '#6366f1');

    container.appendChild(btn1);
    container.appendChild(btn2);
    return container;
  },
};
