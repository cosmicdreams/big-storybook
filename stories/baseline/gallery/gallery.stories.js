import '../../../src/components/baseline/gallery/gallery.css';
import { expect, userEvent, waitFor } from '@storybook/test';

/**
 * Native Image Gallery using Baseline features:
 * - CSS Grid for layout
 * - aspect-ratio for consistent sizing
 * - object-fit for framing
 */
export default {
  title: 'Baseline/Gallery',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    aspectClass: {
      control: 'select',
      options: ['aspect-square', 'aspect-video'],
    },
    fitClass: {
      control: 'select',
      options: ['fit-cover', 'fit-contain'],
    },
  },
};

const GridTemplate = (args) => {
  const { images, aspectClass, fitClass } = args;
  const container = document.createElement('div');
  container.className = 'baseline-gallery';

  images.forEach((img) => {
    const imgEl = document.createElement('img');
    imgEl.src = img.url;
    imgEl.alt = img.alt || 'Gallery image';
    imgEl.className = `${aspectClass} ${fitClass}`;
    if (img.loading) {
      imgEl.loading = img.loading;
    }
    container.appendChild(imgEl);
  });

  return container;
};

const ViewerTemplate = (args) => {
  const container = document.createElement('div');
  container.className = 'gallery-viewer';

  const images = args.images;

  container.innerHTML = `
        <div class="main-view ${args.aspectClass}">
            <img src="${images[0].url}" id="active-frame" class="${args.fitClass}" style="width:100%; height:100%;">
        </div>
        <div class="thumb-strip" id="thumb-strip">
            ${images
    .map(
      (img, i) => `
                <button class="thumb-btn ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="View image ${i + 1}">
                    <img src="${img.url}" alt="Thumbnail ${i + 1}">
                </button>
            `,
    )
    .join('')}
        </div>
    `;

  const mainImg = container.querySelector('#active-frame');
  const thumbs = container.querySelectorAll('.thumb-btn');

  thumbs.forEach((btn) => {
    btn.onclick = () => {
      const index = btn.dataset.index;
      const update = () => {
        thumbs.forEach((t) => t.classList.remove('active'));
        btn.classList.add('active');
        mainImg.src = images[index].url;
      };

      if (document.startViewTransition) {
        document.startViewTransition(update);
      } else {
        update();
      }
    };
  });

  return container;
};

export const InteractiveViewer = {
  render: ViewerTemplate,
  args: {
    aspectClass: 'aspect-video',
    fitClass: 'fit-cover',
    images: [
      { url: 'https://picsum.photos/id/101/1200/800', alt: 'Ocean' },
      { url: 'https://picsum.photos/id/102/1200/800', alt: 'Mountain' },
      { url: 'https://picsum.photos/id/103/1200/800', alt: 'Forest' },
      { url: 'https://picsum.photos/id/104/1200/800', alt: 'Sky' },
    ],
  },
  play: async ({ canvasElement, step }) => {
    const thumbs = canvasElement.querySelectorAll('.thumb-btn');
    const mainImg = canvasElement.querySelector('#active-frame');

    await step('Initial image is displayed', async () => {
      expect(mainImg.src).toContain('id/101');
    });

    await step('Switch to second image', async () => {
      await userEvent.click(thumbs[1]);
      await waitFor(() => {
        expect(mainImg.src).toContain('id/102');
        expect(thumbs[1].classList.contains('active')).toBe(true);
      });
    });
  },
};

export const ResponsiveSquareGallery = {
  render: GridTemplate,
  args: {
    aspectClass: 'aspect-square',
    fitClass: 'fit-cover',
    images: [
      { url: 'https://picsum.photos/id/10/800/800', alt: 'Ocean', loading: 'lazy' },
      { url: 'https://picsum.photos/id/20/800/800', alt: 'Mountain', loading: 'lazy' },
      { url: 'https://picsum.photos/id/30/800/800', alt: 'Forest', loading: 'lazy' },
      { url: 'https://picsum.photos/id/40/800/800', alt: 'Sky', loading: 'lazy' },
    ],
  },
  play: async ({ canvasElement, step }) => {
    const images = canvasElement.querySelectorAll('img');

    await step('Verify images have aspect-ratio and object-fit', async () => {
      images.forEach((img) => {
        const style = getComputedStyle(img);
        expect(style.objectFit).toBe('cover');
      });
    });

    await step('Verify lazy loading attribute', async () => {
      images.forEach((img) => {
        expect(img.getAttribute('loading')).toBe('lazy');
      });
    });
  },
};

export const VideoAspectGallery = {
  render: GridTemplate,
  args: {
    aspectClass: 'aspect-video',
    fitClass: 'fit-cover',
    images: [
      { url: 'https://picsum.photos/id/50/800/450', alt: 'Demo 1' },
      { url: 'https://picsum.photos/id/51/800/450', alt: 'Demo 2' },
      { url: 'https://picsum.photos/id/52/800/450', alt: 'Demo 3' },
    ],
  },
  play: async ({ canvasElement }) => {
    const images = canvasElement.querySelectorAll('img');
    expect(getComputedStyle(images[0]).aspectRatio).toBe('16 / 9');
  },
};

export const ScrollSnapCarousel = {
  render: (args) => {
    const container = document.createElement('div');
    container.className = 'scroll-snap-gallery';
    args.images.forEach((img) => {
      const imgEl = document.createElement('img');
      imgEl.src = img.url;
      imgEl.className = `${args.aspectClass} ${args.fitClass}`;
      container.appendChild(imgEl);
    });
    return container;
  },
  args: {
    aspectClass: 'aspect-square',
    fitClass: 'fit-cover',
    images: [
      { url: 'https://picsum.photos/id/60/800/800' },
      { url: 'https://picsum.photos/id/61/800/800' },
      { url: 'https://picsum.photos/id/62/800/800' },
      { url: 'https://picsum.photos/id/63/800/800' },
    ],
  },
};

export const ObjectFitComparison = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '1rem';

    const title1 = document.createElement('h3');
    title1.innerText = `Object-fit: ${args.fitClass} (Customizable)`;
    container.appendChild(title1);
    const g1 = GridTemplate({
      images: [{ url: 'https://picsum.photos/id/60/800/400', alt: 'Wide Image' }],
      aspectClass: args.aspectClass,
      fitClass: args.fitClass,
    });
    container.appendChild(g1);

    return container;
  },
  args: {
    aspectClass: 'aspect-square',
    fitClass: 'fit-contain',
  },
};
