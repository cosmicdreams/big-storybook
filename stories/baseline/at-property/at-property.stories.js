import { within, userEvent, expect, waitFor } from '@storybook/test';
import '../../../src/components/baseline/at-property/at-property.css';

export default {
  title: 'Baseline/AtProperty',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color1: { control: 'color' },
    color2: { control: 'color' },
  },
};

export const GradientInterpolation = {
  render: (args) => `
    <div class="at-property-card" style="--gradient-color-1: ${args.color1}; --gradient-color-2: ${args.color2}">
      ${args.label}
    </div>
  `,
  args: {
    label: 'Hover to Morph',
    color1: '#f3ec78',
    color2: '#af4261',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByText(/Morph/i);

    await step('Verify initial presence', async () => {
      await expect(card).toBeVisible();
    });

    await step('Hover triggers animation', async () => {
      await userEvent.hover(card);
      await expect(card).toBeVisible();
    });
  },
};

export const RadialGlow = {
  render: (args) => `
    <button class="glow-btn" style="--glow-color: ${args.glowColor}">
      ${args.text}
    </button>
  `,
  args: {
    text: 'Interactive Glow',
    glowColor: 'rgba(255,255,255,0.2)',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole('button');
    await userEvent.hover(btn);
  },
};

export const ConicProgressRing = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.gap = '24px';
    container.innerHTML = `
      <div class="progress-ring" id="ring" style="--progress-angle: ${args.initialAngle}deg">
        <span class="content" id="percent">${Math.round(args.initialAngle / 3.6)}%</span>
      </div>
      <div style="display: flex; gap: 10px;">
        <button id="set-50" style="padding: 8px 16px; cursor: pointer;">50%</button>
        <button id="set-100" style="padding: 8px 16px; cursor: pointer;">100%</button>
      </div>
    `;

    const ring = container.querySelector('#ring');
    const text = container.querySelector('#percent');
    const b50 = container.querySelector('#set-50');
    const b100 = container.querySelector('#set-100');

    if (ring && text && b50 && b100) {
      b50.onclick = () => {
        ring.style.setProperty('--progress-angle', '180deg');
        text.innerText = '50%';
      };
      b100.onclick = () => {
        ring.style.setProperty('--progress-angle', '360deg');
        text.innerText = '100%';
      };
    }

    return container;
  },
  args: {
    initialAngle: 0,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const btn50 = canvas.getByText('50%', { selector: 'button' });

    await step('Set progress to 50%', async () => {
      await userEvent.click(btn50);
      await waitFor(() => {
        const percentText = canvasElement.querySelector('#percent');
        expect(percentText.textContent).toBe('50%');
      });
    });
  },
};
