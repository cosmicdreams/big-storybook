import '../../../src/components/baseline/css-shapes/css-shapes.css';

export default {
  title: 'Baseline/CSSShapes',
  parameters: {
    layout: 'padded',
  },
};

// ── Shared render helpers ────────────────────────────────────────────────────

const card = (shapeClass, title, codeLabel, desc) => `
  <div class="css-shapes-card">
    <div class="shape-box ${shapeClass}"></div>
    <div class="shape-label">
      <strong>${title}</strong>
      <code>${codeLabel}</code>
    </div>
    <p class="shape-desc">${desc}</p>
  </div>
`;

const sectionHeader = (title) => `
  <h2 class="css-shapes-section-title">${title}</h2>
`;

// ── All variants in one story ────────────────────────────────────────────────

export const All = {
  name: 'All Shapes',
  render: () => `
    <div class="css-shapes-demo">
      <header class="css-shapes-header">
        <h1 class="css-shapes-title">CSS <code>shape()</code> Function</h1>
        <p class="css-shapes-subtitle">
          <code>clip-path: shape(…)</code> — Chrome 135+. Draw precise paths
          with lines, arcs, and curves using CSS-native syntax.
        </p>
      </header>

      <section class="css-shapes-section">
        ${sectionHeader('Lines')}
        <div class="css-shapes-grid">
          ${card('shape--rectangle', 'Rectangle', 'line to',
            'Four explicit <code>line to</code> commands trace each edge of a rectangle.')}
          ${card('shape--diagonal-cut', 'Diagonal Cut', 'hline / vline',
            '<code>hline to</code> and <code>vline to</code> are axis-aligned shortcuts; a <code>line to</code> creates the diagonal.')}
          ${card('shape--arrow', 'Arrow', 'line to (polygon-like)',
            'All straight lines — shape() replaces <code>polygon()</code> with explicit, readable commands.')}
        </div>
      </section>

      <section class="css-shapes-section">
        ${sectionHeader('Arcs')}
        <div class="css-shapes-grid">
          ${card('shape--notch', 'Top Notch', 'arc by … of 1px',
            'Radius <code>1px</code> on a 2× diameter arc forces a semicircular notch inward (default <code>ccw</code>).')}
          ${card('shape--tab', 'Rounded Tab', 'arc by … cw / ccw',
            'Alternating <code>cw</code> and <code>ccw</code> quarter-circle arcs round each corner individually.')}
          ${card('shape--sector', 'Pie Sector', 'arc to … of 50% large cw',
            'Trigonometry maps a 0–100 value onto arc coordinates; <code>large cw</code> handles angles &gt; 180°.')}
          ${card('shape--scallop', 'Scallop Edge', 'arc by … small cw',
            'Six small <code>cw</code> arcs along the bottom create a decorative scalloped border.')}
        </div>
      </section>

      <section class="css-shapes-section">
        ${sectionHeader('Curves (Bézier)')}
        <div class="css-shapes-grid">
          ${card('shape--wave', 'Wave Bottom', 'curve to … with Xc Yc',
            'Two opposing quadratic Bézier curves create a smooth wave. The <code>with</code> point is the control point.')}
          ${card('shape--slant-curve', 'Slanted Shoulder', 'line to + curve to … with',
            'Straight lines plus a single curve command smooth the transition from a slanted top into the vertical edge.')}
          ${card('shape--blob', 'Organic Blob', 'curve to × 4',
            'Four quadratic curves with pulled-out control points produce an asymmetric organic silhouette.')}
        </div>
      </section>

      <section class="css-shapes-section">
        ${sectionHeader('Combined Techniques')}
        <div class="css-shapes-grid">
          ${card('shape--speech-bubble', 'Speech Bubble', 'lines + arc corners + tail',
            'Arc-rounded corners plus a pointy <code>line to</code> tail — lines and arcs combined in one shape.')}
          ${card('shape--badge', 'Badge / Shield', 'hline + arc + curve',
            'Flat top, arc-rounded upper corners, and a curve-pointed bottom — a classic badge silhouette.')}
        </div>
      </section>

      <footer class="css-shapes-footer">
        <p>
          Browser support: Chrome 135+, Edge 135+. See
          <a href="https://css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs/" target="_blank">CSS-Tricks Part 1</a>,
          <a href="https://css-tricks.com/better-css-shapes-using-shape-part-2-more-on-arcs/" target="_blank">Part 2</a>,
          <a href="https://css-tricks.com/better-css-shapes-using-shape-part-3-curves/" target="_blank">Part 3</a>.
        </p>
      </footer>
    </div>
  `,
};

// ── Individual variant stories ───────────────────────────────────────────────

export const Lines = {
  render: () => `
    <div class="css-shapes-demo">
      <section class="css-shapes-section">
        ${sectionHeader('Lines — line to, hline to, vline to')}
        <div class="css-shapes-grid">
          ${card('shape--rectangle', 'Rectangle', 'line to',
            'Four explicit <code>line to</code> commands trace each edge of a rectangle.')}
          ${card('shape--diagonal-cut', 'Diagonal Cut', 'hline / vline',
            '<code>hline to</code> and <code>vline to</code> are axis-aligned shortcuts; a <code>line to</code> creates the diagonal.')}
          ${card('shape--arrow', 'Arrow', 'line to (polygon-like)',
            'All straight lines — shape() replaces <code>polygon()</code> with explicit, readable commands.')}
        </div>
      </section>
    </div>
  `,
};

export const Arcs = {
  render: () => `
    <div class="css-shapes-demo">
      <section class="css-shapes-section">
        ${sectionHeader('Arcs — arc to/by … of R [large|small] [cw|ccw]')}
        <div class="css-shapes-grid">
          ${card('shape--notch', 'Top Notch', 'arc by … of 1px',
            'Radius <code>1px</code> on a 2× diameter arc forces a semicircular notch inward (default <code>ccw</code>).')}
          ${card('shape--tab', 'Rounded Tab', 'arc by … cw / ccw',
            'Alternating <code>cw</code> and <code>ccw</code> quarter-circle arcs round each corner individually.')}
          ${card('shape--sector', 'Pie Sector', 'arc to … of 50% large cw',
            'Trigonometry maps a 0–100 value onto arc coordinates; <code>large cw</code> handles angles &gt; 180°.')}
          ${card('shape--scallop', 'Scallop Edge', 'arc by … small cw',
            'Six small <code>cw</code> arcs along the bottom create a decorative scalloped border.')}
        </div>
      </section>
    </div>
  `,
};

export const Curves = {
  render: () => `
    <div class="css-shapes-demo">
      <section class="css-shapes-section">
        ${sectionHeader('Curves — curve to X Y with Xc Yc')}
        <div class="css-shapes-grid">
          ${card('shape--wave', 'Wave Bottom', 'curve to … with Xc Yc',
            'Two opposing quadratic Bézier curves create a smooth wave. The <code>with</code> point is the control point.')}
          ${card('shape--slant-curve', 'Slanted Shoulder', 'line to + curve to … with',
            'Straight lines plus a single curve command smooth the transition from a slanted top into the vertical edge.')}
          ${card('shape--blob', 'Organic Blob', 'curve to × 4',
            'Four quadratic curves with pulled-out control points produce an asymmetric organic silhouette.')}
        </div>
      </section>
    </div>
  `,
};

export const Combined = {
  render: () => `
    <div class="css-shapes-demo">
      <section class="css-shapes-section">
        ${sectionHeader('Combined — lines + arcs + curves together')}
        <div class="css-shapes-grid">
          ${card('shape--speech-bubble', 'Speech Bubble', 'lines + arc corners + tail',
            'Arc-rounded corners plus a pointy <code>line to</code> tail — lines and arcs combined in one shape.')}
          ${card('shape--badge', 'Badge / Shield', 'hline + arc + curve',
            'Flat top, arc-rounded upper corners, and a curve-pointed bottom — a classic badge silhouette.')}
        </div>
      </section>
    </div>
  `,
};
