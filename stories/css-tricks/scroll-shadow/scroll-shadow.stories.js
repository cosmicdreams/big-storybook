import '../../../src/components/css-tricks/scroll-shadow/scroll-shadow.css';

export default {
  title: 'CSS-Tricks/ScrollShadow',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => `
    <div class="scroll-shadow-demo">
      <div class="scroll-banner">
        <strong>Scroll-State Container Queries</strong> — This uses <code>@container scroll-state((scrollable: bottom))</code> to trigger shadows natively based on scroll position! Note: Requires Chrome 133+ or a polyfilled browser.
      </div>
      
      <div class="scroll-shadow-container">
        <div class="scroll-shadow-content">
          <ul class="scroll-list">
            <li>Item 1 - Keep scrolling!</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
            <li>Item 6</li>
            <li>Item 7</li>
            <li>Item 8</li>
            <li>Item 9</li>
            <li>Item 10 - You made it to the bottom!</li>
          </ul>
        </div>
      </div>
    </div>
  `,
};
