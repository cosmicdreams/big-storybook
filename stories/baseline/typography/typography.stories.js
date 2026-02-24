import { expect, within } from '@storybook/test';
import '../../../src/components/baseline/typography/typography.css';

export default {
  title: 'Baseline/Typography',
  parameters: { layout: 'centered' },
  argTypes: {
    text: { control: 'text' },
    cqwUnit: { control: { type: 'range', min: 1, max: 20, step: 0.5 } },
  },
};

export const FluidHeading = {
  render: (args) => `
    <div class="fluid-heading-container">
      <h1 class="fluid-heading" style="--fluid-size: clamp(1.5rem, ${args.cqwUnit}cqw, 6rem)">${args.text}</h1>
      <p style="margin-top: 1rem; color: #666;">This heading uses clamp() with customizable cqw units (${args.cqwUnit}cqw).</p>
    </div>
  `,
  args: {
    text: 'Responsive Fluid Typography',
    cqwUnit: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByText(/Typography/i);
    await expect(heading).toBeVisible();
  },
};

export const TypographicScale = {
  render: (args) => `
    <div class="type-scale-system" style="--type-scale: ${args.ratio}">
      <div class="type-scale-item level-6">Level 6 Display</div>
      <div class="type-scale-item level-5">Level 5 Heading</div>
      <div class="type-scale-item level-4">Level 4 Subheading</div>
      <div class="type-scale-item" style="--level: 0">Base Body Text (Level 0)</div>
      <p style="margin-top: 1rem; font-size: 0.8rem; color: #888;">Built using CSS pow() function with ratio: ${args.ratio}</p>
    </div>
  `,
  args: {
    ratio: 1.25,
  },
};

export const TextEffects = {
  render: (args) => `
    <div style="padding: 2rem; max-width: 600px;">
      <h2 class="gradient-text">${args.heading}</h2>
      <p class="drop-cap">${args.content}</p>
    </div>
  `,
  args: {
    heading: 'Gradient Harmony',
    content:
      'Modern typography brings editorial quality to the web. By using native Baseline features like initial-letter, we can achieve complex layouts without brittle hacks or extra spans. This paragraph demonstrates a drop cap starting the text flow.',
  },
};
