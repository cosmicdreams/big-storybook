import '../../../src/components/baseline/container-queries/container-queries.css';
import { expect, waitFor } from '@storybook/test';

export default {
  title: 'Baseline/ContainerQueries',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    containerWidth: {
      control: { type: 'select' },
      options: ['300px', '450px', '600px', '100%'],
    },
    cqwSize: {
      control: { type: 'range', min: 1, max: 20, step: 0.5 },
    },
  },
};

export const ResponsiveCard = {
  render: (args) => `
    <div class="cq-demo-wrapper">
      <div class="card-container" id="resizable-container" style="width: ${args.containerWidth}; border: 2px dashed #999; padding: 10px; resize: horizontal; overflow: auto;">
        <div class="responsive-card">
          <div class="card-image"></div>
          <div class="card-content">
            <h3>${args.title}</h3>
            <p>${args.content}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  args: {
    containerWidth: '350px',
    title: 'Premium Card',
    content: 'Resize the dashed container to see me switch to horizontal layout!',
  },
  play: async ({ canvasElement, step }) => {
    const container = canvasElement.querySelector('#resizable-container');
    const card = canvasElement.querySelector('.responsive-card');

    await step('Initially column layout', async () => {
      // Small width (350px) should be column
      await expect(getComputedStyle(card).flexDirection).toBe('column');
    });

    await step('Resizing container to 600px changes to row layout', async () => {
      container.style.width = '600px';
      await waitFor(
        async () => {
          await expect(getComputedStyle(card).flexDirection).toBe('row');
        },
        { timeout: 1000 },
      );
    });
  },
};

export const StatsWidget = {
  render: (args) => `
    <div class="cq-demo-wrapper">
      <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
        <div class="widget-container" style="width: 200px;">
          <p>Narrow (Sidebar Context)</p>
          <div class="stats-widget">
            <div><strong>${args.views}</strong> Views</div>
            <div><strong>${args.likes}</strong> Likes</div>
            <div><strong>${args.shares}</strong> Shares</div>
          </div>
        </div>
        <div class="widget-container" style="flex: 1; min-width: 450px;">
          <p>Wide (Main Content Context)</p>
          <div class="stats-widget">
            <div><strong>${args.views}</strong> Views</div>
            <div><strong>${args.likes}</strong> Likes</div>
            <div><strong>${args.shares}</strong> Shares</div>
          </div>
        </div>
      </div>
    </div>
  `,
  args: {
    views: '1.2k',
    likes: '850',
    shares: '42',
  },
};

export const CQUnits = {
  render: (args) => `
    <div class="cq-demo-wrapper">
      <div class="unit-demo-container">
        <div class="dynamic-text" style="--cq-unit-size: clamp(1rem, ${args.cqwSize}cqw, 10rem)">
          ${args.text}
        </div>
      </div>
      <p style="text-align:center">Resize the box above using the handle (in browsers that support resize on div).</p>
      <p style="text-align:center; font-size: 0.8rem; color: #666;">Current Unit Size: ${args.cqwSize}cqw</p>
    </div>
  `,
  args: {
    text: 'I scale with cqw units',
    cqwSize: 8,
  },
};
