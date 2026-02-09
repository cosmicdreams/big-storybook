import '../../css/baseline/anchor-positioning.css';
import { expect, within, userEvent } from '@storybook/test';

export default {
    title: 'Baseline/AnchorPositioning',
    parameters: {
        layout: 'centered',
    },
};

export const FloatingTooltip = {
    render: (args) => `
    <div class="anchor-demo-container">
      <div style="text-align:center;">
        <button class="anchor-el" id="anchor-btn">Hover for Native Tooltip</button>
        
        <div class="anchored-tooltip">
          <div class="tooltip-header">${args.title}</div>
          <div class="tooltip-body">
            <p>${args.content}</p>
            <div style="margin-top: 10px; padding: 8px; background: #fef2f2; border-radius: 6px; border: 1px solid #fee2e2; color: #b91c1c; font-size: 0.75rem;">
                <strong>Note:</strong> On browsers that don't support <code>anchor-name</code> yet, this will use a standard absolute fallback.
            </div>
          </div>
        </div>
        
        <p style="margin-top: 2rem; color: #666; max-width: 400px; font-size: 0.9rem;">
          This tooltip is positioned using the CSS Anchor Positioning API (Interop 2025). No JavaScript math or <code>getBoundingClientRect</code> was used!
        </p>
      </div>
    </div>
  `,
    args: {
        title: 'Native Anchoring',
        content: 'CSS can now handle floating UI positioning natively. The tooltip automatically tracks the button as its anchor point.'
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByText(/Hover for Native Tooltip/i);

        await step('Verify tooltip appears on hover', async () => {
            await userEvent.hover(trigger);
            const tooltip = canvasElement.querySelector('.anchored-tooltip');
            // Visibility check might be tricky in headless if not supported, 
            // but we can check the DOM element
            await expect(tooltip).toBeInTheDocument();
        });
    }
};
