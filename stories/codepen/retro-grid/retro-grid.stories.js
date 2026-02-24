import '../../../src/components/codepen/retro-grid/retro-grid.css';
import retroGridHtml from '../../../src/components/codepen/retro-grid/retro-grid.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Codepen/Retro Grid',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = retroGridHtml;
    const content = container.querySelector('.retro-content');
    content.innerHTML = `
      <h2 style="color: #ff0080; font-size: 3rem; font-weight: 900; font-style: italic; text-shadow: 0 0 20px #ff0080; letter-spacing: 0.1em;">OVERDRIVE</h2>
    `;
    return container;
  },
};
