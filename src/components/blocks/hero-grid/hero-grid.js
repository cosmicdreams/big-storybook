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
    const meteorContainer = container.querySelector('.premium-meteors-container');

    if (tag && options.tag) tag.innerText = options.tag;
    if (title && options.title) title.innerText = options.title;
    if (desc && options.description) desc.innerText = options.description;

    if (meteorContainer) {
        meteorContainer.innerHTML = '';
        const count = options.meteorCount || 20;
        for (let i = 0; i < count; i++) {
            const meteor = document.createElement('span');
            meteor.className = 'meteor';
            meteor.style.top = Math.random() * 100 + '%';
            meteor.style.left = Math.random() * 100 + '%';
            meteor.style.animationDelay = Math.random() * (0.8 - 0.2) + 0.2 + 's';
            meteor.style.animationDuration = Math.floor(Math.random() * (10 - 2) + 2) + 's';
            meteorContainer.appendChild(meteor);
        }
    }
}
