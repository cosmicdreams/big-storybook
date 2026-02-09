import { within, userEvent, expect, waitFor } from '@storybook/test';
import '../../css/baseline/transitions.css';

export default {
    title: 'Baseline/Transitions',
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        duration: { control: { type: 'range', min: 0.1, max: 2, step: 0.1 } }
    }
};

const applyDuration = (duration) => {
    document.documentElement.style.setProperty('--vt-duration', `${duration}s`);
};

const startTransition = (updateCallback) => {
    if (!document.startViewTransition) {
        updateCallback();
        return;
    }
    document.startViewTransition(updateCallback);
};

export const StateTransition = {
    render: (args) => {
        applyDuration(args.duration);
        const container = document.createElement('div');
        container.innerHTML = `
      <div class="vt-card compact" id="vt-card">
        <div id="card-content" style="text-align: center;">
          <strong style="font-size: 1.2rem;">${args.compactLabel}</strong>
          <p style="margin-top: 8px; opacity: 0.8;">${args.subtext}</p>
        </div>
      </div>
    `;

        const card = container.querySelector('#vt-card');
        const content = container.querySelector('#card-content');

        card.onclick = () => {
            startTransition(() => {
                if (card.classList.contains('compact')) {
                    card.classList.replace('compact', 'expanded');
                    content.innerHTML = `
            <h3 style="margin-bottom: 12px;">${args.expandedTitle}</h3>
            <p style="line-height: 1.5;">${args.expandedContent}</p>
            <button class="modern-btn" id="close-btn" style="margin-top: 20px; padding: 8px 16px; background: #fff; color: #3498db; border: none; border-radius: 8px; cursor: pointer;">Close</button>
          `;
                } else {
                    card.classList.replace('expanded', 'compact');
                    content.innerHTML = `
            <strong style="font-size: 1.2rem;">${args.compactLabel}</strong>
            <p style="margin-top: 8px; opacity: 0.8;">${args.subtext}</p>
          `;
                }
            });
        };

        return container;
    },
    args: {
        duration: 0.5,
        compactLabel: 'Click to Expand',
        subtext: 'Native View Transitions',
        expandedTitle: 'Expanded View',
        expandedContent: 'The View Transition API automatically handles the "morphing" between states.'
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const card = canvasElement.querySelector('#vt-card');

        await step('Click card to expand', async () => {
            await userEvent.click(card);
            await waitFor(() => {
                expect(card.classList.contains('expanded')).toBe(true);
            });
            await expect(canvas.getByText(/Expanded/i)).toBeVisible();
        });

        await step('Click close button to collapse', async () => {
            const closeBtn = await canvas.findByRole('button', { name: /Close/i });
            await userEvent.click(closeBtn);
            await waitFor(() => {
                expect(card.classList.contains('compact')).toBe(true);
            });
        });
    }
};

export const ListReordering = {
    render: (args) => {
        applyDuration(args.duration);
        const container = document.createElement('div');
        container.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; gap:24px;">
        <button id="shuffle-btn" style="padding: 10px 20px; border-radius: 8px; border: 1px solid #ccc; cursor: pointer;">Shuffle Tasks</button>
        <div class="vt-list" id="vt-list">
          <div class="vt-list-item" style="view-transition-name: item-1">${args.item1} <span>Urgent</span></div>
          <div class="vt-list-item" style="view-transition-name: item-2">${args.item2} <span>Medium</span></div>
          <div class="vt-list-item" style="view-transition-name: item-3">${args.item3} <span>Low</span></div>
          <div class="vt-list-item" style="view-transition-name: item-4">${args.item4} <span>High</span></div>
        </div>
      </div>
    `;

        const btn = container.querySelector('#shuffle-btn');
        const list = container.querySelector('#vt-list');

        btn.onclick = () => {
            const items = Array.from(list.children);
            const shuffled = [...items].sort(() => Math.random() - 0.5);

            startTransition(() => {
                list.innerHTML = '';
                shuffled.forEach(item => list.appendChild(item));
            });
        };

        return container;
    },
    args: {
        duration: 0.5,
        item1: '🚀 Launch Website',
        item2: '🎨 Design System',
        item3: '📝 Write Docs',
        item4: '🐛 Fix Bugs'
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const shuffleBtn = canvas.getByRole('button', { name: /Shuffle/i });
        const list = canvasElement.querySelector('#vt-list');

        await step('Perform shuffle', async () => {
            await userEvent.click(shuffleBtn);
            await expect(list.children.length).toBe(4);
        });
    }
};

export const ImageGallery = {
    render: (args) => {
        applyDuration(args.duration);
        const images = [
            { id: 10, title: 'Forest' },
            { id: 20, title: 'Beach' },
            { id: 30, title: 'Mountain' }
        ];

        const container = document.createElement('div');
        container.className = 'vt-gallery-container';
        container.innerHTML = `
      <div class="vt-gallery-main" style="height: ${args.height}px">
        <img src="https://picsum.photos/id/${images[0].id}/800/600" id="active-image" alt="Gallery">
      </div>
      <div class="vt-gallery-thumbs" id="thumbs">
        ${images.map((img, i) => `
          <img src="https://picsum.photos/id/${img.id}/150/150" 
               class="vt-thumb ${i === 0 ? 'active' : ''}" 
               data-id="${img.id}" 
               alt="${img.title}">
        `).join('')}
      </div>
    `;

        const mainImg = container.querySelector('#active-image');
        const thumbs = container.querySelectorAll('.vt-thumb');

        thumbs.forEach(thumb => {
            thumb.onclick = () => {
                const id = thumb.getAttribute('data-id');
                if (thumb.classList.contains('active')) return;

                startTransition(() => {
                    thumbs.forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                    mainImg.src = `https://picsum.photos/id/${id}/800/600`;
                });
            };
        });

        return container;
    },
    args: {
        duration: 0.5,
        height: 300
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const thumbs = canvasElement.querySelectorAll('.vt-thumb');
        const mainImg = canvasElement.querySelector('#active-image');

        await step('Switch to second image', async () => {
            await userEvent.click(thumbs[1]);
            await waitFor(() => {
                expect(thumbs[1].classList.contains('active')).toBe(true);
            });
            await expect(mainImg.src).toContain('/id/20/');
        });
    }
};
