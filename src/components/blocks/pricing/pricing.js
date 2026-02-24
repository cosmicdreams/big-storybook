/**
 * Initializes the Pricing block logic.
 * @param {HTMLElement} container - The pricing container.
 * @param {Object} data - Pricing data and plans.
 */
export function initPricing(container, data = {}) {
    if (!container) return;

    let isYearly = false;

    const title = container.querySelector('.hero-title');
    const desc = container.querySelector('.hero-description');
    const grid = container.querySelector('.pricing-grid');
    const toggle = container.querySelector('.pricing-toggle');
    const labelMonthly = container.querySelector('.pricing-label.monthly');
    const labelYearly = container.querySelector('.pricing-label.yearly');

    if (title && data.title) title.innerText = data.title;
    if (desc && data.description) desc.innerText = data.description;

    const render = () => {
        toggle.classList.toggle('active', isYearly);
        labelMonthly.classList.toggle('active', !isYearly);
        labelYearly.classList.toggle('active', isYearly);

        grid.innerHTML = (data.plans || []).map(plan => `
            <div class="pricing-card ${plan.featured ? 'featured premium-border-beam' : ''}">
                ${plan.badge ? `<span class="badge">${plan.badge}</span>` : ''}
                <h3 class="pricing-card-title">${plan.name}</h3>
                <p class="pricing-card-description">${plan.description}</p>
                <div class="pricing-card-price">
                    <span class="price-currency">$</span>
                    <span class="price-value">${isYearly ? plan.priceYearly : plan.priceMonthly}</span>
                    <span class="price-period">/${isYearly ? 'year' : 'mo'}</span>
                </div>
                <ul class="pricing-features">
                    ${(plan.features || []).map(f => `
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            ${f}
                        </li>
                    `).join('')}
                </ul>
                <div class="pricing-card-action"></div>
            </div>
        `).join('');

        // Dispatch event for buttons if needed, or caller can inject buttons
        const event = new CustomEvent('rendered', { detail: { isYearly } });
        container.dispatchEvent(event);
    };

    toggle.onclick = () => {
        isYearly = !isYearly;
        render();
    };

    render();
}
