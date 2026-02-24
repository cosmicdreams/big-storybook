/**
 * Initializes the Bento Grid glow effect.
 * @param {HTMLElement} container - The container element for the bento grid.
 */
export function initBentoGrid(container) {
    if (!container) return;

    const items = container.querySelectorAll('.bento-item');
    items.forEach((item) => {
        item.onmousemove = (e) => {
            const rect = item.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            item.style.setProperty('--x', `${x}%`);
            item.style.setProperty('--y', `${y}%`);
        };
    });
}
