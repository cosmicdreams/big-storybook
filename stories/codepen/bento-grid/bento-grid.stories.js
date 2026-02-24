import '../../../src/components/codepen/bento-grid/bento-grid.css';
import bentoGridHtml from '../../../src/components/codepen/bento-grid/bento-grid.html?raw';
import { initBentoGrid } from '../../../src/components/codepen/bento-grid/bento-grid.js';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Codepen/Bento Grid',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = bentoGridHtml;
    const grid = container.querySelector('.premium-bento-grid');
    initBentoGrid(grid);
    return container;
  },
};
