import { expect, within } from 'storybook/test';
import '../../../src/components/css-tricks/proximity/proximity.css';
import { initProximity } from '../../../src/components/css-tricks/proximity/proximity.js';

export default {
  title: 'CSS-Tricks/Proximity',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => `
    <div class="proximity-demo">
      <div class="proximity-target" style="--proximity: 0; --distance: 9999;">
        <div class="proximity-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4l2 2"/>
          </svg>
        </div>
        <div class="proximity-label">Hover near me</div>
        <div class="proximity-sublabel">CSS <code>:near()</code> concept</div>
      </div>

      <div class="proximity-readout">
        <div class="readout-row">
          <span class="readout-key">Distance</span>
          <span class="readout-value" data-readout="distance">--</span>
        </div>
        <div class="readout-row">
          <span class="readout-key">Proximity</span>
          <span class="readout-value" data-readout="proximity">--</span>
        </div>
        <div class="readout-row">
          <span class="readout-key">Zone</span>
          <span class="readout-value" data-readout="zone">--</span>
        </div>
      </div>

      <div class="proximity-zones-legend">
        <div class="zone-item zone-far"><span class="zone-dot"></span> Far (&gt;200px)</div>
        <div class="zone-item zone-close"><span class="zone-dot"></span> Close (100-200px)</div>
        <div class="zone-item zone-near"><span class="zone-dot"></span> Very close (&lt;100px)</div>
      </div>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector('.proximity-target');
    if (el) {
      initProximity(el, 300);
    }

    const distanceReadout = canvasElement.querySelector('[data-readout="distance"]');
    const proximityReadout = canvasElement.querySelector('[data-readout="proximity"]');
    const zoneReadout = canvasElement.querySelector('[data-readout="zone"]');

    await step('Initial state', async () => {
      expect(distanceReadout.textContent).toBe('--');
      expect(proximityReadout.textContent).toBe('--');
      expect(zoneReadout.textContent).toBe('--');
    });

    await step('Simulate far mouse movement', async () => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
      // Give time for requestAnimationFrame to fire
      await new Promise((r) => setTimeout(r, 50));

      expect(distanceReadout.textContent).not.toBe('--');
      expect(proximityReadout.textContent).not.toBe('--');
      expect(zoneReadout.textContent).toBe('Far');
    });

    await step('Simulate proximal mouse movement', async () => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      document.dispatchEvent(new MouseEvent('mousemove', { clientX: centerX + 50, clientY: centerY + 50 }));
      await new Promise((r) => setTimeout(r, 50));

      // Should be very close now
      expect(zoneReadout.textContent).toBe('Very close');
    });
  },
};
