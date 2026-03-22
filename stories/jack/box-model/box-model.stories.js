import '../../../src/components/jack/box-model/box-model.css';

export default {
  title: 'Jack/BoxModel',
  parameters: {
    layout: 'padded',
  },
};

// ── 1. Anatomy — the four layers ─────────────────────────────────────────────

export const Anatomy = {
  name: '1. Anatomy',
  render: () => `
    <div class="box-model-demo">
      <h1>The CSS Box Model</h1>
      <p class="subtitle">Every element on the page is a rectangular box made of four layers.</p>

      <div class="box-anatomy">
        <div class="box-anatomy-layers">
          <div class="box-layer box-layer--margin">
            <span class="box-layer-label">Margin</span>
            <div class="box-layer box-layer--border">
              <span class="box-layer-label">Border</span>
              <div class="box-layer box-layer--padding">
                <span class="box-layer-label">Padding</span>
                <div class="box-layer box-layer--content">Content</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="note">
        <strong>From inside out:</strong>
        <strong>Content</strong> (your text/images) →
        <strong>Padding</strong> (breathing room inside the border) →
        <strong>Border</strong> (the visible edge) →
        <strong>Margin</strong> (space between this box and its neighbors).
      </div>

      <h2>The CSS for this box</h2>
      <p>
        <code>margin: 40px</code> — yellow zone<br>
        <code>border: 4px solid</code> — red zone<br>
        <code>padding: 30px</code> — green zone<br>
        The blue center is the content area, sized by <code>width</code> and <code>height</code>.
      </p>
    </div>
  `,
};

// ── 2. box-sizing: content-box vs border-box ─────────────────────────────────

export const BoxSizing = {
  name: '2. box-sizing',
  render: () => `
    <div class="box-model-demo">
      <h1>box-sizing</h1>
      <p class="subtitle">The single most important box model property. Controls what <code>width</code> actually means.</p>

      <div class="box-compare">
        <div class="box-compare-card">
          <h3>content-box (default)</h3>
          <div class="card-body">
            <div class="sizing-ruler sizing-ruler-wide"></div>
            <div class="sizing-demo-box sizing-content-box">
              width: 250px
            </div>
          </div>
          <div class="card-note">
            Total rendered width = 250 + 20×2 (padding) + 4×2 (border) = <strong>298px</strong>.
            The <code>width</code> only sizes the content area.
          </div>
        </div>

        <div class="box-compare-card">
          <h3>border-box ✓</h3>
          <div class="card-body">
            <div class="sizing-ruler"></div>
            <div class="sizing-demo-box sizing-border-box">
              width: 250px
            </div>
          </div>
          <div class="card-note">
            Total rendered width = exactly <strong>250px</strong>.
            Padding and border are included <em>inside</em> the width.
          </div>
        </div>
      </div>

      <div class="note">
        <strong>Best practice:</strong> Use the universal reset <code>*, *::before, *::after { box-sizing: border-box; }</code>
        so <code>width</code> always means the outer size. Every modern CSS framework does this.
      </div>
    </div>
  `,
};

// ── 3. Padding vs Margin ─────────────────────────────────────────────────────

export const PaddingVsMargin = {
  name: '3. Padding vs Margin',
  render: () => `
    <div class="box-model-demo">
      <h1>Padding vs Margin</h1>
      <p class="subtitle">Both create space, but in fundamentally different ways.</p>

      <div class="pm-demo">
        <div>
          <h2>Padding</h2>
          <div class="pm-padding-box">
            Content with 40px padding<br>
            <small>Space is <em>inside</em> the border</small>
          </div>
          <p>
            ✓ Has background color<br>
            ✓ Clickable area<br>
            ✓ Never negative<br>
            ✓ Never collapses
          </p>
        </div>

        <div>
          <h2>Margin</h2>
          <div class="pm-margin-outer">
            <div class="pm-margin-box">
              Content with 40px margin<br>
              <small>Space is <em>outside</em> the border</small>
            </div>
          </div>
          <p>
            ✗ Transparent (yellow is parent bg)<br>
            ✗ Not clickable<br>
            ✓ Can be negative<br>
            ✓ Can use <code>auto</code> for centering
          </p>
        </div>
      </div>

      <div class="note">
        <strong>Rule of thumb:</strong> Use <strong>padding</strong> when you want more room <em>inside</em>
        the element (bigger click target, background extends). Use <strong>margin</strong> when you want space
        <em>between</em> elements.
      </div>
    </div>
  `,
};

// ── 4. Margin Collapse ───────────────────────────────────────────────────────

export const MarginCollapse = {
  name: '4. Margin Collapse',
  render: () => `
    <div class="box-model-demo">
      <h1>Margin Collapse</h1>
      <p class="subtitle">Adjacent vertical margins don't stack — the larger one wins. This only happens in block flow.</p>

      <div class="box-compare">
        <div class="box-compare-card">
          <h3>Collapsed (block flow)</h3>
          <div class="card-body">
            <div class="margin-demo-container">
              <div class="margin-demo-box margin-collapse-a">margin-bottom: 30px</div>
              <div class="margin-demo-box margin-collapse-b">margin-top: 30px</div>
            </div>
          </div>
          <div class="card-note">
            Gap = <strong>30px</strong> (not 60px). The two margins collapse into one.
          </div>
        </div>

        <div class="box-compare-card">
          <h3>No collapse (flex)</h3>
          <div class="card-body">
            <div class="margin-demo-container margin-no-collapse-wrapper">
              <div class="margin-demo-box margin-collapse-a">margin-bottom: 30px</div>
              <div class="margin-demo-box margin-collapse-b">margin-top: 30px</div>
            </div>
          </div>
          <div class="card-note">
            Gap = <strong>60px</strong>. Flexbox prevents margin collapse entirely.
          </div>
        </div>
      </div>

      <div class="note">
        <strong>Margins never collapse</strong> in: flexbox, grid, floats, absolutely positioned elements,
        or elements with <code>overflow</code> other than <code>visible</code>.
      </div>
    </div>
  `,
};

// ── 5. Margin Auto & Negative ────────────────────────────────────────────────

export const MarginTricks = {
  name: '5. Margin Auto & Negative',
  render: () => `
    <div class="box-model-demo">
      <h1>Margin Tricks</h1>
      <p class="subtitle"><code>margin: auto</code> and negative margins — two powerful box model techniques.</p>

      <h2>margin: 0 auto (center)</h2>
      <div class="margin-demo-container" style="margin-bottom: 24px;">
        <div class="margin-demo-box margin-auto-box">margin: 0 auto</div>
      </div>

      <h2>margin-left: auto (push right)</h2>
      <div class="margin-demo-container" style="margin-bottom: 24px;">
        <div class="margin-demo-box margin-push-box">margin-left: auto</div>
      </div>

      <h2>Negative margin (overlap)</h2>
      <div class="margin-demo-container">
        <div class="margin-demo-box">Normal element</div>
        <div class="margin-demo-box margin-negative-box">margin-top: -20px</div>
      </div>

      <div class="note">
        <strong>Auto margins</strong> absorb available space. Two opposing auto margins split the space
        evenly → centering. One auto margin takes all the space → pushes to the opposite side.
      </div>
    </div>
  `,
};

// ── 6. Display & Box Behavior ────────────────────────────────────────────────

export const DisplayTypes = {
  name: '6. Display Types',
  render: () => `
    <div class="box-model-demo">
      <h1>Display & Box Behavior</h1>
      <p class="subtitle">The <code>display</code> property determines how the box model applies to an element.</p>

      <h2>inline</h2>
      <div class="display-demo-container" style="margin-bottom: 24px;">
        Text before
        <span class="display-inline" style="padding: 12px 20px; margin: 20px;">inline span with padding: 12px, margin: 20px</span>
        text after — notice vertical padding/margin doesn't push other lines away.
      </div>

      <h2>inline-block</h2>
      <div class="display-demo-container" style="margin-bottom: 24px;">
        Text before
        <span class="display-inline-block">inline-block: full box model works</span>
        text after — vertical padding/margin is respected.
      </div>

      <h2>block</h2>
      <div class="display-demo-container">
        <div class="display-block">Block element — takes full width</div>
        <div class="display-block">Each one starts on a new line</div>
      </div>

      <div class="note">
        <strong>Key difference:</strong> <code>inline</code> ignores <code>width</code>, <code>height</code>,
        and vertical <code>margin</code>. <code>inline-block</code> respects them all while staying in the text flow.
      </div>
    </div>
  `,
};

// ── 7. Overflow ──────────────────────────────────────────────────────────────

const overflowContent = `
  This content is deliberately too long for its container.
  It keeps going and going to demonstrate how different
  overflow values handle content that exceeds the box dimensions.
  Watch how each box treats this extra text differently.
`;

export const Overflow = {
  name: '7. Overflow',
  render: () => `
    <div class="box-model-demo">
      <h1>Overflow</h1>
      <p class="subtitle">When content exceeds its box dimensions, <code>overflow</code> controls what happens.</p>

      <div class="overflow-demo-grid">
        <div class="overflow-demo-cell">
          <h4><code>overflow: visible</code> (default)</h4>
          <div class="overflow-box overflow-visible">${overflowContent}</div>
        </div>

        <div class="overflow-demo-cell">
          <h4><code>overflow: hidden</code></h4>
          <div class="overflow-box overflow-hidden">${overflowContent}</div>
        </div>

        <div class="overflow-demo-cell">
          <h4><code>overflow: auto</code></h4>
          <div class="overflow-box overflow-auto">${overflowContent}</div>
        </div>
      </div>

      <div class="note">
        <strong>Tip:</strong> Prefer <code>overflow: auto</code> over <code>overflow: scroll</code> —
        auto only shows scrollbars when content actually overflows.
        Also: <code>overflow: hidden</code> creates a new block formatting context (prevents margin collapse).
      </div>
    </div>
  `,
};

// ── 8. Intrinsic Sizing ──────────────────────────────────────────────────────

export const IntrinsicSizing = {
  name: '8. Intrinsic Sizing',
  render: () => `
    <div class="box-model-demo">
      <h1>Intrinsic Sizing</h1>
      <p class="subtitle">Modern CSS sizing keywords let the content determine the box width.</p>

      <div class="intrinsic-demo">
        <div>
          <h2><code>width: max-content</code></h2>
          <div class="intrinsic-box intrinsic-max-content">
            This box is as wide as its content needs — no wrapping at all.
          </div>
        </div>

        <div>
          <h2><code>width: min-content</code></h2>
          <div class="intrinsic-box intrinsic-min-content">
            This box shrinks to the widest single word.
          </div>
        </div>

        <div>
          <h2><code>width: fit-content</code></h2>
          <div class="intrinsic-box intrinsic-fit-content">
            This box acts like max-content but won't exceed available width.
          </div>
        </div>
      </div>

      <div class="note">
        <strong>Use cases:</strong> <code>fit-content</code> is great for tags, badges, and buttons
        that should hug their text. <code>min-content</code> works for narrow sidebars or label columns.
      </div>
    </div>
  `,
};

// ── 9. Aspect Ratio ──────────────────────────────────────────────────────────

export const AspectRatio = {
  name: '9. Aspect Ratio',
  render: () => `
    <div class="box-model-demo">
      <h1>Aspect Ratio</h1>
      <p class="subtitle"><code>aspect-ratio</code> adds a size constraint that maintains proportions — part of the modern box model.</p>

      <div class="aspect-demo">
        <div class="aspect-box aspect-1-1">1 / 1</div>
        <div class="aspect-box aspect-16-9">16 / 9</div>
        <div class="aspect-box aspect-4-3">4 / 3</div>
      </div>

      <p>
        Each box has only <code>width</code> set (by the grid column). The height is
        automatically calculated from the aspect ratio. No padding-top hacks needed.
      </p>

      <div class="note">
        <strong>Before <code>aspect-ratio</code></strong>, developers used the "padding-top trick"
        (<code>padding-top: 56.25%</code> for 16:9). The <code>aspect-ratio</code> property replaced
        this hack entirely — Baseline 2021.
      </div>
    </div>
  `,
};

// ── 10. Logical Properties ───────────────────────────────────────────────────

export const LogicalProperties = {
  name: '10. Logical Properties',
  render: () => `
    <div class="box-model-demo">
      <h1>Logical Properties</h1>
      <p class="subtitle">The modern box model uses <em>logical</em> directions (inline/block) instead of physical (left/right/top/bottom).</p>

      <div class="logical-demo">
        <div>
          <h2>Physical (old)</h2>
          <div class="logical-box logical-physical">
            padding-left: 30px<br>
            padding-right: 30px<br>
            border-top / border-bottom
          </div>
          <p>Breaks in RTL languages — left stays left even when text flows right-to-left.</p>
        </div>

        <div>
          <h2>Logical (modern)</h2>
          <div class="logical-box logical-logical">
            padding-inline: 30px<br>
            <br>
            border-block
          </div>
          <p>Adapts automatically — <code>inline</code> follows text direction, <code>block</code> follows document flow.</p>
        </div>
      </div>

      <table style="width: 100%; font-size: 0.8rem; border-collapse: collapse; margin: 16px 0;">
        <thead>
          <tr style="border-bottom: 2px solid #e5e5e5;">
            <th style="text-align: left; padding: 8px;">Physical</th>
            <th style="text-align: left; padding: 8px;">Logical</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 6px 8px;"><code>margin-top / margin-bottom</code></td>
            <td style="padding: 6px 8px;"><code>margin-block</code></td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 6px 8px;"><code>margin-left / margin-right</code></td>
            <td style="padding: 6px 8px;"><code>margin-inline</code></td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 6px 8px;"><code>padding-top / padding-bottom</code></td>
            <td style="padding: 6px 8px;"><code>padding-block</code></td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 6px 8px;"><code>padding-left / padding-right</code></td>
            <td style="padding: 6px 8px;"><code>padding-inline</code></td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 6px 8px;"><code>width / height</code></td>
            <td style="padding: 6px 8px;"><code>inline-size / block-size</code></td>
          </tr>
          <tr>
            <td style="padding: 6px 8px;"><code>top / bottom / left / right</code></td>
            <td style="padding: 6px 8px;"><code>inset-block / inset-inline</code></td>
          </tr>
        </tbody>
      </table>

      <div class="note">
        <strong>Baseline 2023.</strong> Logical properties are supported in all modern browsers.
        Prefer them for any new component — they make internationalization automatic.
      </div>
    </div>
  `,
};
