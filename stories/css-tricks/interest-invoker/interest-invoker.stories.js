import { expect, userEvent, within, fireEvent } from 'storybook/test';
import '../../../src/components/css-tricks/interest-invoker/interest-invoker.css';
import { initInterestInvoker } from '../../../src/components/css-tricks/interest-invoker/interest-invoker.js';

export default {
  title: 'CSS-Tricks/InterestInvoker',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => `
    <div class="interest-invoker-demo">

      <!-- Browser Support Banner -->
      <div class="interest-banner">
        <strong>Interest Invoker API</strong> — This demo uses the Interest Invoker API
        (<code>interesttarget</code>, <code>interest-show-delay</code>, <code>interest-hide-delay</code>).
        In unsupported browsers, a JS polyfill simulates the delay behavior.
        <span class="interest-badge" data-interest-badge></span>
      </div>

      <!-- Example 1: Simple Tooltip -->
      <section class="interest-example">
        <h3>Simple Tooltip</h3>
        <p class="interest-description">Hover over the button to reveal a tooltip after a short delay.</p>
        <div class="interest-example-area">
          <button class="interest-trigger interest-trigger--button"
                  interesttarget="my-tooltip"
                  style="--interest-show-delay: 200; --interest-hide-delay: 300;">
            Hover me for tooltip
          </button>
          <div popover id="my-tooltip" class="interest-popover interest-popover--tooltip">
            This is a tooltip revealed by hover intent.
          </div>
        </div>
      </section>

      <!-- Example 2: Link Preview Card -->
      <section class="interest-example">
        <h3>Link Preview Card</h3>
        <p class="interest-description">Hover over the link to see a card-style preview with image and description.</p>
        <div class="interest-example-area">
          <a href="#"
             class="interest-trigger interest-trigger--link"
             interesttarget="preview-card"
             style="--interest-show-delay: 300; --interest-hide-delay: 400;"
             onclick="event.preventDefault()">
            CSS-Tricks: Interest Invoker API
          </a>
          <div popover id="preview-card" class="interest-popover interest-popover--card">
            <div class="preview-card-image"></div>
            <div class="preview-card-body">
              <h4>Interest Invoker API</h4>
              <p>A new browser API for hover-intent popovers using <code>interesttarget</code> and CSS delay properties. No JavaScript needed in supported browsers.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Example 3: Navigation Item with Submenu -->
      <section class="interest-example">
        <h3>Navigation Submenu</h3>
        <p class="interest-description">Hover over a nav item to reveal a mini-submenu popover.</p>
        <nav class="interest-nav">
          <ul class="interest-nav-list">
            <li class="interest-nav-item">
              <a href="#"
                 class="interest-trigger interest-trigger--nav"
                 interesttarget="submenu-products"
                 style="--interest-show-delay: 150; --interest-hide-delay: 350;"
                 onclick="event.preventDefault()">
                Products
              </a>
              <div popover id="submenu-products" class="interest-popover interest-popover--submenu">
                <ul class="interest-submenu-list">
                  <li><a href="#" onclick="event.preventDefault()">Widget Alpha</a></li>
                  <li><a href="#" onclick="event.preventDefault()">Widget Beta</a></li>
                  <li><a href="#" onclick="event.preventDefault()">Widget Gamma</a></li>
                </ul>
              </div>
            </li>
            <li class="interest-nav-item">
              <a href="#"
                 class="interest-trigger interest-trigger--nav"
                 interesttarget="submenu-resources"
                 style="--interest-show-delay: 150; --interest-hide-delay: 350;"
                 onclick="event.preventDefault()">
                Resources
              </a>
              <div popover id="submenu-resources" class="interest-popover interest-popover--submenu">
                <ul class="interest-submenu-list">
                  <li><a href="#" onclick="event.preventDefault()">Documentation</a></li>
                  <li><a href="#" onclick="event.preventDefault()">Blog</a></li>
                  <li><a href="#" onclick="event.preventDefault()">Community</a></li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </section>

    </div>
  `,
  play: async ({ canvasElement, step }) => {
    initInterestInvoker(canvasElement);
    const canvas = within(canvasElement);

    const tooltipTrigger = canvas.getByText('Hover me for tooltip');
    const tooltipPopover = canvasElement.querySelector('#my-tooltip');

    const cardTrigger = canvas.getByText('CSS-Tricks: Interest Invoker API');
    const cardPopover = canvasElement.querySelector('#preview-card');

    await step('Initial state: Tooltip and card popovers are hidden', async () => {
      expect(tooltipPopover).not.toBeVisible();
      expect(cardPopover).not.toBeVisible();
    });

    await step('Hovering tooltip trigger shows tooltip after show delay', async () => {
      await userEvent.hover(tooltipTrigger);
      // Wait for delay (> 200ms + transition)
      await new Promise((r) => setTimeout(r, 400));
      expect(tooltipPopover).toBeVisible();
    });

    await step('Unhovering tooltip trigger hides tooltip after hide delay', async () => {
      // Use explicit fireEvent to ensure mouseleave logic in polyfill is tested reliably
      fireEvent.mouseLeave(tooltipTrigger);
      // Wait for hide delay (300ms) + CSS transition (200ms) + buffer > 500ms
      await new Promise((r) => setTimeout(r, 700));
      expect(tooltipPopover).not.toBeVisible();
    });

    await step('Hovering card trigger shows card after show delay', async () => {
      await userEvent.hover(cardTrigger);
      // Wait for delay (> 300ms + transition)
      await new Promise((r) => setTimeout(r, 500));
      expect(cardPopover).toBeVisible();
    });

    await step('Unhovering card trigger hides card after hide delay', async () => {
      fireEvent.mouseLeave(cardTrigger);
      // Wait for hide delay (400ms) + CSS transition (200ms) + buffer > 600ms
      await new Promise((r) => setTimeout(r, 800));
      expect(cardPopover).not.toBeVisible();
    });
  },
};
