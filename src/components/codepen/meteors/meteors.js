/**
 * Initializes the meteors effect in a container.
 * @param {HTMLElement} container - The container element for the meteors.
 * @param {number} count - The number of meteors to generate.
 */
export function initMeteors(container, count = 20) {
    if (!container) return;

    // Clear existing meteors if any
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const meteor = document.createElement('span');
        meteor.className = 'meteor';
        meteor.style.top = Math.random() * 100 + '%';
        meteor.style.left = Math.random() * 100 + '%';
        meteor.style.animationDelay = Math.random() * (0.8 - 0.2) + 0.2 + 's';
        meteor.style.animationDuration = Math.floor(Math.random() * (10 - 2) + 2) + 's';
        container.appendChild(meteor);
    }
}
