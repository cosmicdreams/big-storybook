/**
 * Initializes the carousel controls.
 * @param {HTMLElement} container - The carousel container element.
 * @param {number} scrollAmount - The amount to scroll on each click.
 */
export function initCarousel(container, scrollAmount = 350) {
    if (!container) return;

    const content = container.querySelector('.ui-carousel-content');
    const prevBtn = container.querySelector('.ui-carousel-prev');
    const nextBtn = container.querySelector('.ui-carousel-next');

    if (prevBtn) {
        prevBtn.onclick = () => content.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }

    if (nextBtn) {
        nextBtn.onclick = () => content.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}
