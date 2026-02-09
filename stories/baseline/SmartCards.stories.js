import '../../css/baseline/smart-cards.css';
import { expect, within, userEvent, waitFor } from '@storybook/test';

export default {
    title: 'Baseline/SmartCards',
    parameters: {
        layout: 'fullscreen',
    },
};

export const ParentAwareState = {
    render: (args) => `
    <div style="background: #fdfcfb; min-height: 100vh;">
      <div style="padding: 4rem 2rem; max-width: 1000px; margin: 0 auto;">
        <h1 style="margin-bottom: 3rem;">Smart Cards using <code>:has()</code></h1>
        
        <div class="smart-card-grid">
          <div class="smart-card" id="card-1">
            <div class="card-control"><input type="checkbox" id="check-1"></div>
            <div class="status-icon">🚀</div>
            <h3>Project Launch</h3>
            <p>This card uses the CSS <code>:has()</code> selector to transform its entire container when the checkbox is checked.</p>
            <div class="card-notes">
              <p style="font-size: 0.875rem; color: #6366f1;"><strong>Note:</strong> This extra content reveals automatically without JS!</p>
            </div>
            <button class="card-action">Take Action</button>
          </div>

          <div class="smart-card" id="card-2">
            <div class="card-control"><input type="checkbox" id="check-2"></div>
            <div class="status-icon">🎨</div>
            <h3>Design System</h3>
            <p>Try hovering over the "Take Action" button below to see the card border glow—again, using pure CSS <code>:has()</code>.</p>
             <div class="card-notes">
              <p style="font-size: 0.875rem; color: #6366f1;"><strong>Note:</strong> Parent-aware logic is amazing for UX.</p>
            </div>
            <button class="card-action">Take Action</button>
          </div>
        </div>
      </div>
    </div>
  `,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const card1 = canvasElement.querySelector('#card-1');
        const checkbox1 = canvasElement.querySelector('#check-1');

        await step('Check the checkbox to trigger parent styles', async () => {
            await userEvent.click(checkbox1);
            await waitFor(() => {
                const style = getComputedStyle(card1);
                // Expect background change (rgb of #f5f3ff is 245, 243, 255)
                expect(style.backgroundColor).toContain('245, 243, 255');
            }, { timeout: 1000 });
        });

        await step('Verify notes are visible', async () => {
            const notes = card1.querySelector('.card-notes');
            await waitFor(() => {
                // Use parseFloat to handle strings like "1.0" and check for >= 0.99 to account for subpixel rendering or animation timing
                expect(parseFloat(getComputedStyle(notes).opacity)).toBeGreaterThanOrEqual(0.99);
            }, { timeout: 1000 });
        });
    }
};
