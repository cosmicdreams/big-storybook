/**
 * Initializes the tabs logic.
 * @param {HTMLElement} container - The tabs container element.
 */
export function initTabs(container) {
    if (!container) return;

    const triggers = container.querySelectorAll('.ui-tabs-trigger');
    const contents = container.querySelectorAll('.ui-tabs-content');

    triggers.forEach(trigger => {
        trigger.onclick = () => {
            const tabId = trigger.dataset.tab;

            // Update triggers
            triggers.forEach(t => t.classList.toggle('active', t === trigger));

            // Update contents
            contents.forEach(c => {
                c.style.display = c.id === tabId ? 'block' : 'none';
            });
        };
    });
}
