import '../../../src/components/shadcn/carousel/carousel.css';
import carouselHtml from '../../../src/components/shadcn/carousel/carousel.html?raw';
import { initCarousel } from '../../../src/components/shadcn/carousel/carousel.js';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Carousel',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = carouselHtml;
    initCarousel(container);

    const content = container.querySelector('.ui-carousel-content');
    [1, 2, 3].forEach((num) => {
      const item = document.createElement('div');
      item.className = 'ui-carousel-item';
      item.innerHTML = `
            <div class="ui-card" style="height: 200px; display: flex; align-items: center; justify-content: center; font-size: 3rem; font-weight: 700; background: hsl(var(--muted));">
                ${num}
            </div>
        `;
      content.appendChild(item);
    });

    return container;
  },
};
