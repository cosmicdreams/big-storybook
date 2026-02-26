export default {
  title: 'Introduction',
};

export const Welcome = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <style>
        .welcome {
          padding: 48px 56px;
          font-family: system-ui, sans-serif;
          max-width: 860px;
          color: #1a1a1a;
          line-height: 1.6;
        }
        .welcome h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 8px;
        }
        .welcome .tagline {
          font-size: 1.05rem;
          color: #555;
          margin: 0 0 40px;
        }
        .welcome h2 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 32px 0 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #888;
        }
        .pillars {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 40px;
        }
        .pillar {
          padding: 20px;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          background: #fafafa;
        }
        .pillar h3 {
          font-size: 0.95rem;
          font-weight: 600;
          margin: 0 0 8px;
        }
        .pillar p {
          font-size: 0.85rem;
          color: #555;
          margin: 0 0 10px;
        }
        .pillar ul {
          font-size: 0.8rem;
          color: #666;
          margin: 0;
          padding-left: 16px;
        }
        .pillar li { margin-bottom: 3px; }
        .stack {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .badge {
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 500;
          background: #f0f0f0;
          color: #333;
          border: 1px solid #e0e0e0;
        }
        .divider {
          border: none;
          border-top: 1px solid #e5e5e5;
          margin: 32px 0;
        }
        .footer { font-size: 0.85rem; color: #888; }
        .footer strong { color: #555; }
      </style>

      <div class="welcome">
        <h1>Big Storybook</h1>
        <p class="tagline">A high-fidelity gallery of web platform ideas — built with Baseline 2024/2025 features, pure CSS/HTML, and zero heavy dependencies.</p>

        <h2>The Three Pillars</h2>
        <div class="pillars">
          <div class="pillar">
            <h3>Baseline</h3>
            <p>Deep dives into cutting-edge browser-native CSS/HTML.</p>
            <ul>
              <li>Scroll-Driven Animations</li>
              <li>Anchor Positioning</li>
              <li>Parent-Aware UI (<code>:has()</code>)</li>
              <li>Dynamic Color Engine</li>
              <li>View Transition API</li>
            </ul>
          </div>
          <div class="pillar">
            <h3>Modern UI Kit</h3>
            <p>30+ Shadcn-inspired production-ready components.</p>
            <ul>
              <li>Buttons, Inputs, Badges</li>
              <li>Tables, OTP, Progress</li>
              <li>Mega menus, Tabs, Carousels</li>
              <li>Dialogs, Tooltips, Toasts</li>
            </ul>
          </div>
          <div class="pillar">
            <h3>Codepen</h3>
            <p>Cinematic landing page effects for high-impact UX.</p>
            <ul>
              <li>Interactive Bento Grid</li>
              <li>Retro Grid</li>
              <li>Aurora Text</li>
              <li>Shimmer Button</li>
            </ul>
          </div>
        </div>

        <h2>Tech Stack</h2>
        <div class="stack">
          <span class="badge">Bun</span>
          <span class="badge">Storybook 10</span>
          <span class="badge">Vite 7</span>
          <span class="badge">Vitest 4</span>
          <span class="badge">Playwright</span>
          <span class="badge">Modern CSS only</span>
          <span class="badge">Zero runtime deps</span>
        </div>

        <hr class="divider">

        <div class="footer">
          <strong>Version</strong> 3.0.0 &nbsp;·&nbsp;
          <strong>Tests</strong> 70+ passing &nbsp;·&nbsp;
          <strong>Engine</strong> Bun + Storybook 10
        </div>
      </div>
    `;
    return container;
  },
};
