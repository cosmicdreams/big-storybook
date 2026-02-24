/**
 * Shows a toast message.
 * @param {string} title - The toast title.
 * @param {string} description - The toast description.
 * @param {string} toastHtml - The toast HTML template.
 */
export function showToast(title, description, toastHtml) {
    let container = document.querySelector('.ui-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'ui-toast-container';
        container.style.cssText = `
            position: fixed;
            bottom: 0;
            right: 0;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            z-index: 2000;
        `;
        document.body.appendChild(container);
    }

    const toastWrapper = document.createElement('div');
    toastWrapper.innerHTML = toastHtml;
    const toast = toastWrapper.firstElementChild;
    toast.querySelector('.ui-toast-title').innerText = title;
    toast.querySelector('.ui-toast-description').innerText = description;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}
