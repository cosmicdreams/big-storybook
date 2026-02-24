/**
 * Initializes the OTP input logic.
 * @param {HTMLElement} container - The OTP container element.
 * @param {number} length - Number of digits.
 */
export function initOTP(container, length = 6) {
    if (!container) return;

    const group = container.querySelector('.ui-otp-group');
    if (!group) return;

    group.innerHTML = '';
    const inputs = [];

    for (let i = 0; i < length; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.className = 'ui-otp-input';
        input.dataset.index = i;

        input.oninput = (e) => {
            if (e.target.value && i < length - 1) {
                inputs[i + 1].focus();
            }
        };

        input.onkeydown = (e) => {
            if (e.key === 'Backspace' && !e.target.value && i > 0) {
                inputs[i - 1].focus();
            }
        };

        group.appendChild(input);
        inputs.push(input);

        if (i === (length / 2) - 1 && length > 4) {
            const sep = document.createElement('div');
            sep.className = 'ui-otp-separator';
            group.appendChild(sep);
        }
    }
}
