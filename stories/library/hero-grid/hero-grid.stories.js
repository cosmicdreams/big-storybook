import '../../../src/components/blocks/hero-grid/hero-grid.css';
import heroGridHtml from '../../../src/components/blocks/hero-grid/hero-grid.html?raw';
import { initHeroGrid } from '../../../src/components/blocks/hero-grid/hero-grid.js';
import '../../../css/modern-ui-kit/globals.css';

// Import required premium assets for blocks
import '../../../src/components/codepen/meteors/meteors.css';
import '../../../src/components/codepen/aurora-text/aurora-text.css';
import '../../../src/components/codepen/shimmer-button/shimmer-button.css';
import '../../../src/components/codepen/border-beam/border-beam.css';

export default {
  title: 'Library/Hero Grid',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = (args) => {
  const container = document.createElement('div');
  container.innerHTML = heroGridHtml;

  initHeroGrid(container, {
    tag: 'New Season 2025',
    title: 'Build your dream project with ease',
    description: 'Experience the next generation of web development. Highly performant, accessible, and stunningly beautiful components built with native CSS features.',
    meteorCount: args.count,
  });

  const actions = container.querySelector('.hero-actions');
  actions.innerHTML = `
    <button class="premium-shimmer-btn" style="--bg-color: hsl(var(--primary)); --shimmer-color: white;">
        Get Started Now
    </button>
    <button class="hero-btn-secondary">
        View Components
    </button>
  `;

  return container;
};

Default.args = {
  count: 20,
};
