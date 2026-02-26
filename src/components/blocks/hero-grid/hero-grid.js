/**
 * Initializes the Hero Grid logic.
 * @param {HTMLElement} container - The hero container.
 * @param {Object} options - Hero configuration.
 */
export function initHeroGrid(container, options = {}) {
    if (!container) return;

    const tag = container.querySelector('.hero-tag');
    const title = container.querySelector('.hero-title');
    const desc = container.querySelector('.hero-description');

    if (tag && options.tag) tag.innerText = options.tag;
    if (title && options.title) title.innerText = options.title;
    if (desc && options.description) desc.innerText = options.description;
}
