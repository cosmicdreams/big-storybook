import '../../../src/components/codepen/border-beam/border-beam.css';
import borderBeamHtml from '../../../src/components/codepen/border-beam/border-beam.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Codepen/Border Beam',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = borderBeamHtml;
    const beam = container.querySelector('.premium-border-beam');
    beam.style.width = '300px';
    beam.style.padding = '2rem';
    beam.style.background = 'hsl(var(--card))';
    beam.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';

    const content = container.querySelector('.border-beam-content');
    content.innerHTML = `
      <h3 class="ui-card-title">Border Beam</h3>
      <p class="ui-card-description" style="margin-top: 1rem;">A glowing beam traveling along the bounding box. Uses CSS @property.</p>
    `;
    return container;
  },
};
