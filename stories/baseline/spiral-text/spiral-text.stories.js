import '../../../src/components/baseline/spiral-text/spiral-text.css';

export default {
  title: 'Baseline/Spiral Text',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Spiral Scrollytelling** using CSS \`sibling-index()\` and scroll-driven animations.

Inspired by [CSS-Tricks: Spiral Scrollytelling in CSS with sibling-index()](https://css-tricks.com/spiral-scrollytelling-in-css-with-sibling-index/).

### How it works
- Each \`.spiral-char\` element uses \`sibling-index()\` and \`sibling-count()\` to compute its own **radius**, **rotation angle**, and **scale** — no JavaScript index calculations needed.
- \`animation-timeline: scroll(root)\` ties the fade-in stagger and the outer vortex spin directly to scroll position.
- The parent \`.vortex\` counter-rotates so characters travel inward as you scroll.

### Browser support
Requires **Chrome 131+** (scroll-driven animations + \`sibling-index()\`). Firefox shows a fallback message.
        `.trim(),
      },
    },
  },
  argTypes: {
    text: { control: 'text', description: 'Text to spiral' },
    spiralTurns: {
      control: { type: 'range', min: 1, max: 6, step: 0.5 },
      description: 'Number of full rotations in the spiral',
    },
    outerRadius: {
      control: { type: 'range', min: 10, max: 45, step: 1 },
      description: 'Outer radius in vmin',
    },
  },
};

/* ─── Helper: split text into .spiral-char elements ──────────────────────── */

function buildVortex(text, spiralTurns, outerRadius) {
  // Replace regular spaces with a non-breaking thin space so they get their own span
  const chars = [...text.replace(/ /g, '\u2000')];
  return chars
    .map(
      (ch) => `<div class="spiral-char"><span>${ch === '\u2000' ? '&nbsp;' : ch}</span></div>`,
    )
    .join('');
}

/* ─── Default story ───────────────────────────────────────────────────────── */

export const Default = {
  args: {
    text: 'Scroll down to enter the vortex — a spiral built entirely in CSS using sibling-index()',
    spiralTurns: 3,
    outerRadius: 28,
  },
  render: ({ text, spiralTurns, outerRadius }) => {
    const innerHTML = buildVortex(text, spiralTurns, outerRadius);

    // Inline the dynamic CSS custom properties so controls affect the spiral live
    const dynamicCSS = `
      <style>
        .spiral-char {
          --radius: calc(${outerRadius}vmin - (${outerRadius * 0.8}vmin / sibling-count() * sibling-index()));
          --rotation: calc((360deg * ${spiralTurns} / sibling-count()) * sibling-index());
        }
      </style>
    `;

    return `
      ${dynamicCSS}

      <!-- Unsupported browser fallback -->
      <div class="spiral-unsupported">
        <div>
          <h2>Browser not supported</h2>
          <p>This demo requires Chrome 131+ for scroll-driven animations and <code>sibling-index()</code>.</p>
        </div>
      </div>

      <!-- Main scrolling scene -->
      <div class="spiral-scene">
        <div class="spiral-sticky">
          <div class="vortex" aria-label="${text}">
            ${innerHTML}
          </div>
          <p class="spiral-prompt">Scroll to reveal</p>
        </div>
      </div>
    `;
  },
};

/* ─── Short phrase variant ────────────────────────────────────────────────── */

export const ShortPhrase = {
  args: {
    text: 'INTO THE VOID',
    spiralTurns: 2,
    outerRadius: 22,
  },
  render: Default.render,
};

/* ─── Dense text variant ──────────────────────────────────────────────────── */

export const DenseSpiral = {
  args: {
    text: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()',
    spiralTurns: 4,
    outerRadius: 35,
  },
  render: Default.render,
};
