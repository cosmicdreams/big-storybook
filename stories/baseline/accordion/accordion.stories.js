import '../../../src/components/baseline/accordion/accordion.css';
import { expect, within, userEvent, waitFor } from 'storybook/test';

export default {
  title: 'Baseline/Accordion',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    exclusive: { control: 'boolean' },
  },
};

export const ModernAccordion = {
  render: (args) => {
    const groupName = args.exclusive ? 'my-accordion' : '';
    return `
      <div class="accordion-group">
        <h2 style="text-align:center; margin-bottom: 2rem;">Native ${args.exclusive ? 'Exclusive' : 'Multiple'} Accordion</h2>
        
        <details class="modern-details" ${groupName ? `name="${groupName}"` : ''} open>
          <summary>What is Baseline 2024? <span></span></summary>
          <div class="details-content">
            <p>Baseline 2024 represents the set of web platform features that became supported across all major browser engines (Chrome, Edge, Firefox, and Safari) during the year 2024.</p>
          </div>
        </details>

        <details class="modern-details" ${groupName ? `name="${groupName}"` : ''}>
          <summary>How does details[name] work? <span></span></summary>
          <div class="details-content">
            <p>By giving multiple <code>&lt;details&gt;</code> elements the same <code>name</code> attribute, the browser automatically ensures only one can be open at a time—creating a native accordion without JavaScript.</p>
          </div>
        </details>

        <details class="modern-details" ${groupName ? `name="${groupName}"` : ''}>
          <summary>Is this supported in all browsers? <span></span></summary>
          <div class="details-content">
            <p>Yes! As of 2024, this feature is widely available in all modern evergreen browsers, making it safe for production use.</p>
          </div>
        </details>
      </div>
    `;
  },
  args: {
    exclusive: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const details = canvasElement.querySelectorAll('details');

    await step('Initial state: first one is open', async () => {
      await expect(details[0].open).toBe(true);
      await expect(details[1].open).toBe(false);
    });

    await step('Clicking second one opens it', async () => {
      const summary2 = canvas.getByText(/How does details\[name\] work/i);
      await userEvent.click(summary2);
      await waitFor(async () => {
        await expect(details[1].open).toBe(true);
      });
    });

    await step('If exclusive, first one should now be closed', async () => {
      const isExclusive = details[0].hasAttribute('name');
      if (isExclusive) {
        await waitFor(async () => {
          await expect(details[0].open).toBe(false);
        });
      }
    });
  },
};
