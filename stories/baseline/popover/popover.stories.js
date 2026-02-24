import { within, userEvent, expect, waitFor } from '@storybook/test';
import '../../../src/components/baseline/popover/popover.css';

export default {
  title: 'Baseline/Popover',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    popoverMode: {
      control: 'select',
      options: ['auto', 'manual'],
    },
  },
};

export const Simple = {
  render: (args) => `
    <div class="popover-container">
      <button popovertarget="simple-pop" class="modern-btn">${args.buttonLabel}</button>
      <div id="simple-pop" popover="${args.popoverMode}">
        <h3 style="margin:0 0 0.5rem 0">${args.popoverTitle}</h3>
        <p style="margin:0">${args.popoverContent}</p>
      </div>
    </div>
  `,
  args: {
    buttonLabel: 'Open Simple Popover',
    popoverMode: 'auto',
    popoverTitle: 'Premium Popover',
    popoverContent: 'Native Popover API with light dismiss.',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');

    await step('Popover is initially hidden', async () => {
      const popover = canvasElement.querySelector('#simple-pop');
      await expect(popover).not.toBeVisible();
    });

    await step('Clicking trigger opens popover', async () => {
      await userEvent.click(trigger);
      const popover = canvasElement.querySelector('#simple-pop');
      await expect(popover).toBeVisible();
    });
  },
};

export const SideDrawer = {
  render: (args) => `
    <div class="popover-container" style="min-height: 400px; width: 600px;">
      <button popovertarget="drawer-pop" class="modern-btn">${args.triggerLabel}</button>
      
      <div id="drawer-pop" popover="auto" class="side-drawer" style="--drawer-width: ${args.width}px">
        <div class="drawer-inner">
          <div class="drawer-header">
            <h2>${args.title}</h2>
            <button popovertarget="drawer-pop" popovertargetaction="hide" class="close-btn" aria-label="Close drawer">×</button>
          </div>
          <div class="drawer-body">
            <p>${args.content}</p>
            <div style="margin-top: 2rem; display: flex; flex-direction: column; gap: 1rem;">
                <div style="height: 100px; background: #f3f4f6; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #9ca3af;">Content Block 1</div>
                <div style="height: 100px; background: #f3f4f6; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #9ca3af;">Content Block 2</div>
                <div style="height: 100px; background: #f3f4f6; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #9ca3af;">Content Block 3</div>
            </div>
          </div>
          <div class="drawer-footer">
            <button class="modern-btn" style="width: 100%;">${args.actionLabel}</button>
          </div>
        </div>
      </div>
    </div>
  `,
  args: {
    triggerLabel: 'Open Side Drawer',
    title: 'User Profile',
    content:
      'This drawer uses the Popover API combined with modern CSS properties like @starting-style and overlay to achieve a high-performance slide-out animation.',
    width: 400,
    actionLabel: 'Save Changes',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('Open Side Drawer');

    await step('Open drawer', async () => {
      await userEvent.click(trigger);
      const drawer = canvasElement.querySelector('#drawer-pop');
      await expect(drawer).toBeVisible();
    });

    await step('Close drawer via X button', async () => {
      const closeBtn = canvas.getByLabelText('Close drawer');
      await userEvent.click(closeBtn);
      const drawer = canvasElement.querySelector('#drawer-pop');
      await waitFor(() => {
        expect(drawer).not.toBeVisible();
      });
    });
  },
};

export const Nested = {
  render: (args) => `
    <div class="popover-container">
      <button popovertarget="nested-1" class="modern-btn">${args.label1}</button>
      <div id="nested-1" popover="auto" class="popover-nested-1">
        <h4 style="margin:0 0 0.5rem 0">Level 1</h4>
        <button popovertarget="nested-2" class="modern-btn" style="padding: 8px 16px;">${args.label2}</button>
        <div id="nested-2" popover="auto" class="popover-nested-2">
          <h4 style="margin:0 0 0.5rem 0">Level 2</h4>
          <p style="margin:0">${args.content2}</p>
        </div>
      </div>
    </div>
  `,
  args: {
    label1: 'Open Layer 1',
    label2: 'Open Layer 2',
    content2: 'Top Layer content',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open Layer 1', async () => {
      await userEvent.click(canvas.getByText('Open Layer 1'));
      const layer1 = canvasElement.querySelector('#nested-1');
      await expect(layer1).toBeVisible();
    });

    await step('Open Layer 2 from inside Layer 1', async () => {
      await userEvent.click(canvas.getByText('Open Layer 2'));
      const layer2 = canvasElement.querySelector('#nested-2');
      await expect(layer2).toBeVisible();
    });
  },
};

export const ManualWithBackdrop = {
  render: (args) => {
    const container = document.createElement('div');
    container.className = 'popover-container';
    container.innerHTML = `
      <button id="man-trigger" class="modern-btn">${args.btnLabel}</button>
      <div id="man-pop" popover="manual" class="custom-backdrop-popover">
        <h4 style="margin:0 0 0.5rem 0">${args.title}</h4>
        <p style="margin:0 0 1rem 0">${args.content}</p>
        <button id="man-close" class="modern-btn" style="background:#ef4444">Close</button>
      </div>
    `;

    const trigger = container.querySelector('#man-trigger');
    const popover = container.querySelector('#man-pop');
    const closer = container.querySelector('#man-close');

    if (trigger && popover && closer) {
      trigger.onclick = () => popover.showPopover();
      closer.onclick = () => popover.hidePopover();
    }

    return container;
  },
  args: {
    btnLabel: 'Manual Control',
    title: 'Manual & Backdrop',
    content: 'Using ::backdrop and manual state.',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Clicking trigger opens manual popover', async () => {
      const trigger = canvas.getByText('Manual Control');
      await userEvent.click(trigger);
      const popover = canvasElement.querySelector('#man-pop');
      await expect(popover).toBeVisible();
    });

    await step('Clicking close button hides manual popover', async () => {
      const closeBtn = canvas.getByText('Close');
      await userEvent.click(closeBtn);
      const popover = canvasElement.querySelector('#man-pop');
      await expect(popover).not.toBeVisible();
    });
  },
};
