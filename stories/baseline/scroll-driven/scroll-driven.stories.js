import '../../../src/components/baseline/scroll-driven/scroll-animations.css';
import { expect, within } from '@storybook/test';

export default {
  title: 'Baseline/ScrollDriven',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    itemCount: { control: { type: 'range', min: 2, max: 10, step: 1 } },
  },
};

export const ScrollProgress = {
  render: (args) => `
    <div style="height: 300vh; position: relative; background: #fafafa;">
      <div class="scroll-progress-container">
        <div class="scroll-progress-bar" id="progress-bar"></div>
      </div>
      
      <div style="padding: 4rem 2rem; max-width: 800px; margin: 0 auto; line-height: 1.8; color: #444;">
        <h1 style="font-size: 3rem; margin-bottom: 2rem;">Scroll Timeline Demo</h1>
        <p>Watch the thin bar at the top as you scroll. It uses the native <code>scroll()</code> timeline without any JavaScript event listeners.</p>
        
        <div class="parallax-container">
          <img src="https://picsum.photos/id/10/1200/1200" class="parallax-img" alt="Parallax">
          <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.2);">
            <h2 style="color: white; font-size: 3rem; text-shadow: 0 4px 10px rgba(0,0,0,0.3);">Parallax Logic</h2>
          </div>
        </div>

        <div class="scroll-reveal-container">
          ${Array.from({ length: args.itemCount })
    .map(
      (_, i) => `
            <div class="reveal-item">
              <h3 style="color: #6366f1; margin-bottom: 1rem;">Section ${i + 1}</h3>
              <p>This box fades in and scales up automatically as it enters the viewport using the <code>view()</code> timeline.</p>
            </div>
          `,
    )
    .join('')}
        </div>
        
        <div style="height: 50vh;"></div>
      </div>
    </div>
  `,
  args: {
    itemCount: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Scroll Timeline Demo/i)).toBeVisible();
  },
};
