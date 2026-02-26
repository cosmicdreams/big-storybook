import { expect, userEvent, within, fireEvent } from 'storybook/test';
import '../../../src/components/css-tricks/discoverability/discoverability.css';

export default {
  title: 'CSS-Tricks/Discoverability',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {
  render: () => `
    <div class="discoverability-demo">

      <!-- Section 1: Accordion using hidden="until-found" -->
      <section class="discover-section">
        <h2 class="discover-heading">Accordion with <code>hidden="until-found"</code></h2>

        <div class="discover-callout">
          <strong>Try it:</strong> Press <kbd>Ctrl+F</kbd> (or <kbd>Cmd+F</kbd> on Mac) and search for text inside a collapsed panel — the browser will automatically reveal it!
        </div>

        <div class="accordion">
          <div class="accordion-item">
            <button class="accordion-trigger" onclick="this.parentElement.querySelector('[hidden]')?.removeAttribute('hidden'); this.parentElement.querySelector('.accordion-panel')?.classList.add('is-open');">
              What is <code>hidden="until-found"</code>?
            </button>
            <div class="accordion-panel" hidden="until-found">
              <p>The <code>hidden="until-found"</code> attribute tells the browser to hide content visually, but still make it discoverable by the browser's built-in find-in-page (Ctrl+F) feature. When a match is found inside, the browser fires a <code>beforematch</code> event and removes the <code>hidden</code> attribute automatically.</p>
            </div>
          </div>

          <div class="accordion-item">
            <button class="accordion-trigger" onclick="this.parentElement.querySelector('[hidden]')?.removeAttribute('hidden'); this.parentElement.querySelector('.accordion-panel')?.classList.add('is-open');">
              How does <code>beforematch</code> work?
            </button>
            <div class="accordion-panel" hidden="until-found">
              <p>The <code>beforematch</code> event fires on an element with <code>hidden="until-found"</code> right before the browser reveals it due to a find-in-page match. You can use this event to add animations or update UI state — for example, adding an <code>is-open</code> class to smoothly transition the panel open.</p>
            </div>
          </div>

          <div class="accordion-item">
            <button class="accordion-trigger" onclick="this.parentElement.querySelector('[hidden]')?.removeAttribute('hidden'); this.parentElement.querySelector('.accordion-panel')?.classList.add('is-open');">
              Why not just use <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code>?
            </button>
            <div class="accordion-panel" hidden="until-found">
              <p>While <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> is great for simple disclosures, <code>hidden="until-found"</code> gives you full control over styling and animation. It also integrates with the browser's find-in-page, which <code>&lt;details&gt;</code> does not consistently support across browsers. This makes it ideal for search-friendly accordions and collapsible sections.</p>
            </div>
          </div>

          <div class="accordion-item">
            <button class="accordion-trigger" onclick="this.parentElement.querySelector('[hidden]')?.removeAttribute('hidden'); this.parentElement.querySelector('.accordion-panel')?.classList.add('is-open');">
              Browser support &amp; fallback
            </button>
            <div class="accordion-panel" hidden="until-found">
              <p><code>hidden="until-found"</code> is supported in Chromium-based browsers (Chrome 102+, Edge 102+). In browsers that do not support the <code>until-found</code> value, the attribute falls back to the standard <code>hidden</code> behavior — content is hidden and not findable. Progressive enhancement is the recommended approach: use it as an addition, not a requirement.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2: Comparison Table -->
      <section class="discover-section">
        <h2 class="discover-heading">Hiding Techniques Compared</h2>

        <p class="discover-subtitle">Each box below hides a paragraph of text using a different CSS/HTML technique. Try using <kbd>Tab</kbd> to focus and <kbd>Ctrl+F</kbd> to search for the hidden text.</p>

        <div class="comparison-grid">

          <div class="comparison-box comparison-box--display-none">
            <div class="comparison-label">display: none</div>
            <div class="comparison-badges">
              <span class="badge badge--no">Not focusable</span>
              <span class="badge badge--no">Not findable</span>
            </div>
            <div class="comparison-content" style="display: none;">
              <p>DISPLAY_NONE_SECRET: This paragraph is hidden with display:none. It is completely removed from the layout, not focusable via Tab, and not discoverable via Ctrl+F.</p>
            </div>
            <p class="comparison-note">Content is completely removed from layout and accessibility tree.</p>
          </div>

          <div class="comparison-box comparison-box--visibility-hidden">
            <div class="comparison-label">visibility: hidden</div>
            <div class="comparison-badges">
              <span class="badge badge--no">Not focusable</span>
              <span class="badge badge--no">Not findable</span>
            </div>
            <div class="comparison-content" style="visibility: hidden; height: 0; overflow: hidden;">
              <p>VISIBILITY_HIDDEN_SECRET: This paragraph is hidden with visibility:hidden. Layout space is preserved but the content is invisible, not focusable, and not findable via Ctrl+F.</p>
            </div>
            <p class="comparison-note">Layout space preserved but content is invisible and inaccessible.</p>
          </div>

          <div class="comparison-box comparison-box--content-visibility">
            <div class="comparison-label">content-visibility: hidden</div>
            <div class="comparison-badges">
              <span class="badge badge--yes">Focusable</span>
              <span class="badge badge--yes">Findable via Ctrl+F</span>
            </div>
            <div class="comparison-content cv-hidden">
              <p>CONTENT_VISIBILITY_SECRET: This paragraph is hidden with content-visibility:hidden. The element is not painted but remains in the accessibility tree, can receive focus, and is findable via Ctrl+F. It uses contain-intrinsic-size to reserve layout space.</p>
              <a href="#" tabindex="0">Focusable link inside content-visibility:hidden</a>
            </div>
            <p class="comparison-note">Hidden visually, but focusable and discoverable by find-in-page.</p>
          </div>

          <div class="comparison-box comparison-box--until-found">
            <div class="comparison-label">hidden="until-found"</div>
            <div class="comparison-badges">
              <span class="badge badge--yes">Findable via Ctrl+F</span>
              <span class="badge badge--yes">Auto-reveals on match</span>
            </div>
            <div class="comparison-content" hidden="until-found">
              <p>UNTIL_FOUND_SECRET: This paragraph uses hidden="until-found". It is hidden but findable via Ctrl+F. When you search for this text, the browser will automatically remove the hidden attribute and reveal the content — firing a beforematch event in the process.</p>
            </div>
            <p class="comparison-note">Hidden until browser find-in-page matches; then revealed automatically.</p>
          </div>

        </div>
      </section>

    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // Wire beforematch for accordion panels — animate open when found via Ctrl+F
    const panels = canvasElement.querySelectorAll('[hidden="until-found"]');
    panels.forEach((panel) => {
      panel.addEventListener('beforematch', () => {
        panel.classList.add('is-open');
      });
    });

    await step('Manually clicking accordion trigger reveals content', async () => {
      const trigger = canvasElement.querySelectorAll('.accordion-trigger')[0];
      const panel = trigger.parentElement.querySelector('.accordion-panel');

      expect(panel.hasAttribute('hidden')).toBe(true);
      expect(panel.classList.contains('is-open')).toBe(false);

      await userEvent.click(trigger);

      expect(panel.hasAttribute('hidden')).toBe(false);
      expect(panel.classList.contains('is-open')).toBe(true);
    });

    await step('Triggering beforematch via simulated Ctrl+F finding text updates class', async () => {
      const trigger = canvasElement.querySelectorAll('.accordion-trigger')[1];
      const panel = trigger.parentElement.querySelector('.accordion-panel');

      expect(panel.classList.contains('is-open')).toBe(false);

      fireEvent(panel, new Event('beforematch'));

      expect(panel.classList.contains('is-open')).toBe(true);
    });
  },
};
