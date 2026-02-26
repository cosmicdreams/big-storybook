import '../../../src/components/baseline/color-system/dynamic-colors.css';
import { expect, within } from 'storybook/test';

export default {
  title: 'Baseline/ColorSystem',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    primaryColor: { control: 'color' },
    scheme: {
      control: 'select',
      options: ['light', 'dark', 'normal'],
    },
  },
};

export const DynamicTheming = {
  render: (args) => `
    <div class="theme-demo-wrapper" style="--theme-primary: ${args.primaryColor}; color-scheme: ${args.scheme};">
      <h2 style="margin-top:0">Modern Color Logic</h2>
      <p>This component uses <code>color-mix()</code>, <code>light-dark()</code>, and <strong>Relative Color Syntax</strong> (<code>hsl(from ... h+offset s l)</code>) to generate a full UI palette—including all status colors—from a single primary variable.</p>
      
      <div class="color-swatch-container">
        <div class="swatch" title="Base Primary"></div>
        <div style="flex: 1;">
          <strong>Dynamic Glow</strong>
          <p style="font-size: 0.8rem; opacity: 0.7;">Calculated using Relative Color Syntax: <code>rgb(from var(--primary) r g b / 0.4)</code></p>
        </div>
      </div>

      <div class="status-grid">
        <div class="status-badge info">System Processing</div>
        <div class="status-badge">Task Completed</div>
        <div class="status-badge warning">Pending Review</div>
        <div class="status-badge error">Action Required</div>
      </div>
      
      <p style="margin-top: 2rem; font-size: 0.85rem; padding: 1rem; border-radius: 8px; background: rgba(0,0,0,0.05);">
        Switch the <b>scheme</b> control to "dark" to see <code>light-dark()</code> in action!
      </p>
    </div>
  `,
  args: {
    primaryColor: '#6366f1',
    scheme: 'light',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Modern Color Logic/i)).toBeVisible();
  },
};
