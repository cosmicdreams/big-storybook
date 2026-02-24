import { initProximity } from '../../css-tricks/proximity/proximity.js';

/**
 * Gallery — Native scroll-state carousel initializer
 * Synthesizes: scroll-snap + scroll-state(snapped) + :near() proximity awareness.
 * CSS handles active-state visuals; proximity drives smooth approach effects.
 * JS responsibility: proximity init, thumbnail sync, keyboard nav, optional autoplay.
 */
export function initGallery(container, options = {}) {
  const track = container.querySelector('.gallery-track');
  const thumbs = container.querySelectorAll('.gallery-thumb');
  const thumbStrip = container.querySelector('.gallery-thumbs');
  if (!track || !thumbs.length) return;

  // --- Proximity: each slide reacts as cursor approaches ---
  const slides = container.querySelectorAll('.gallery-slide');
  slides.forEach((slide) => initProximity(slide, 250));

  // --- Thumbnail click → scroll track ---
  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
      const slideWidth = track.querySelector('.gallery-slide').offsetWidth;
      track.scrollTo({ left: slideWidth * i, behavior: 'smooth' });
    });
  });

  // --- Sync active thumb on scrollend ---
  function syncActiveThumbs() {
    const slideWidth = track.querySelector('.gallery-slide')?.offsetWidth || 1;
    const index = Math.round(track.scrollLeft / slideWidth);
    thumbs.forEach((t, i) => t.classList.toggle('is-active', i === index));
    // Scroll thumb strip to keep active thumb visible
    const activeThumb = thumbs[index];
    if (activeThumb && thumbStrip) {
      const thumbLeft = activeThumb.offsetLeft;
      const thumbWidth = activeThumb.offsetWidth;
      const stripWidth = thumbStrip.offsetWidth;
      thumbStrip.scrollTo({
        left: thumbLeft - stripWidth / 2 + thumbWidth / 2,
        behavior: 'smooth',
      });
    }
  }

  track.addEventListener('scrollend', syncActiveThumbs);
  // Fallback for browsers without scrollend
  let scrollTimer;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(syncActiveThumbs, 150);
  });

  // --- Keyboard navigation ---
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const slideWidth = track.querySelector('.gallery-slide')?.offsetWidth || 1;
      const dir = e.key === 'ArrowLeft' ? -1 : 1;
      track.scrollBy({ left: slideWidth * dir, behavior: 'smooth' });
    }
  });
  container.setAttribute('tabindex', '0');

  // --- Optional autoplay ---
  if (options.autoplay) {
    const interval = options.interval ?? 4000;
    let timer;
    const advance = () => {
      const slideWidth = track.querySelector('.gallery-slide')?.offsetWidth || 1;
      const maxScroll = track.scrollWidth - track.clientWidth;
      const next = track.scrollLeft + slideWidth > maxScroll ? 0 : track.scrollLeft + slideWidth;
      track.scrollTo({ left: next, behavior: 'smooth' });
    };
    const start = () => { timer = setInterval(advance, interval); };
    const stop = () => clearInterval(timer);
    container.addEventListener('mouseenter', stop);
    container.addEventListener('mouseleave', start);
    container.addEventListener('focusin', stop);
    container.addEventListener('focusout', start);
    start();
  }

  // Init: mark first thumb active
  syncActiveThumbs();
}
