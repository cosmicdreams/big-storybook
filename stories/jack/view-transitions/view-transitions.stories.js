import { within, userEvent, expect, waitFor } from 'storybook/test';
import '../../../src/components/jack/view-transitions/view-transitions.css';
import '../../../css/modern-ui-kit/globals.css';
import { initViewTransitionsDemo } from '../../../src/components/jack/view-transitions/view-transitions.js';
import rawHtml from '../../../src/components/jack/view-transitions/view-transitions.html?raw';

export default {
  title: 'Jack/ViewTransitions',
  parameters: {
    layout: 'fullscreen',
  },
};

function makeRoot() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = rawHtml;
  const root = wrapper.querySelector('#dc-app');
  return root;
}

// ============================================================
// Default story — full session grid with click-to-detail
// ============================================================
export const SessionGrid = {
  render: () => {
    const root = makeRoot();
    initViewTransitionsDemo(root);
    return root;
  },
};

export const InteractionTests = {
  render: () => {
    const root = makeRoot();
    initViewTransitionsDemo(root);
    return root;
  },
  play: async ({ canvasElement, step }) => {
    await step('Grid renders 8 cards', async () => {
      const cards = canvasElement.querySelectorAll('.dc-card');
      await expect(cards.length).toBe(8);
    });

    await step('Click a card to open detail view', async () => {
      const firstCard = canvasElement.querySelector('.dc-card[data-session="1"]');
      await userEvent.click(firstCard);

      await waitFor(() => {
        const detailView = canvasElement.querySelector('#dc-detail-view');
        expect(detailView.hidden).toBe(false);
      });

      const detailView = canvasElement.querySelector('#dc-detail-view');
      const detailCanvas = within(detailView);

      await expect(
        detailCanvas.getByText('The Future of CSS: Anchor Positioning & Scroll-Driven Animations'),
      ).toBeVisible();
    });

    await step('Detail view shows correct session info', async () => {
      const detailView = canvasElement.querySelector('#dc-detail-view');
      const detailCanvas = within(detailView);

      await expect(detailCanvas.getByText('Miriam Suzanne')).toBeVisible();
      await expect(detailCanvas.getByText('Hall A')).toBeVisible();
      await expect(detailCanvas.getByText('Mon 10:00 AM')).toBeVisible();
    });

    await step('Back button returns to grid', async () => {
      const backBtn = canvasElement.querySelector('#dc-back-btn');
      await userEvent.click(backBtn);

      await waitFor(() => {
        const gridView = canvasElement.querySelector('#dc-grid-view');
        expect(gridView.hidden).toBe(false);
      });

      const cards = canvasElement.querySelectorAll('.dc-card');
      await expect(cards.length).toBe(8);
    });
  },
};

// ============================================================
// Story pre-opened to the detail view (session 6)
// ============================================================
export const DetailView = {
  render: () => {
    const root = makeRoot();
    const { openSession } = initViewTransitionsDemo(root);
    requestAnimationFrame(() => openSession('6'));
    return root;
  },
};
