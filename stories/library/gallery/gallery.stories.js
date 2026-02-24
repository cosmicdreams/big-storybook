import '../../../src/components/library/gallery/gallery.css';
import '../../../src/components/css-tricks/proximity/proximity.css';
import galleryHtml from '../../../src/components/library/gallery/gallery.html?raw';
import { initGallery } from '../../../src/components/library/gallery/gallery.js';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Library/Gallery',
  parameters: { layout: 'fullscreen' },
};

export const Default = () => {
  const el = document.createElement('div');
  el.innerHTML = galleryHtml;
  initGallery(el);
  return el;
};

export const Autoplay = () => {
  const el = document.createElement('div');
  el.innerHTML = galleryHtml;
  initGallery(el, { autoplay: true, interval: 4000 });
  return el;
};

export const BorderGlow = () => {
  const el = document.createElement('div');
  el.innerHTML = galleryHtml;
  el.querySelector('.gallery').classList.add('gallery--border-glow');
  initGallery(el);
  return el;
};

export const BorderShade = () => {
  document.body.style.background = '#f0ede8';
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'background: #f0ede8; min-height: 100vh;';
  wrapper.innerHTML = galleryHtml;
  wrapper.querySelector('.gallery').classList.add('gallery--border-shade');
  initGallery(wrapper);
  return wrapper;
};
