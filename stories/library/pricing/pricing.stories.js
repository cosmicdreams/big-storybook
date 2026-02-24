import '../../../src/components/blocks/pricing/pricing.css';
import pricingHtml from '../../../src/components/blocks/pricing/pricing.html?raw';
import { initPricing } from '../../../src/components/blocks/pricing/pricing.js';
import '../../../css/modern-ui-kit/globals.css';

// Import required premium assets for blocks
import '../../../src/components/codepen/shimmer-button/shimmer-button.css';

export default {
  title: 'Library/Pricing',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Toggle = () => {
  const container = document.createElement('div');
  container.innerHTML = pricingHtml;

  const data = {
    title: 'Flexible Pricing Plans',
    description: 'Choose the plan that\'s right for your business.',
    plans: [
      {
        name: 'Starter',
        description: 'Perfect for individuals and side projects.',
        priceMonthly: '19',
        priceYearly: '190',
        features: ['5 Projects', 'Basic Analytics', 'Community Support'],
      },
      {
        name: 'Professional',
        description: 'Everything you need for a growing business.',
        priceMonthly: '49',
        priceYearly: '490',
        featured: true,
        badge: 'Popular',
        features: ['Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'Custom Domains', '1TB Storage'],
      },
      {
        name: 'Enterprise',
        description: 'Custom solutions for large organizations.',
        priceMonthly: '99',
        priceYearly: '990',
        features: ['Dedicated Instance', 'SLA Guarantee', '24/7 Phone Support', 'SSO & Security', 'Custom Integration'],
      },
    ],
  };

  container.addEventListener('rendered', () => {
    const plans = container.querySelectorAll('.pricing-card');
    plans.forEach((planBox, idx) => {
      const planAction = planBox.querySelector('.pricing-card-action');
      const plan = data.plans[idx];

      if (plan.featured) {
        planAction.innerHTML = `
                    <button class="premium-shimmer-btn" style="width: 100%; --bg-color: hsl(var(--primary)); --shimmer-color: white;">
                        Upgrade to Pro
                    </button>
                `;
      } else {
        planAction.innerHTML = `
                    <button class="hero-btn-secondary" style="width: 100%;">
                        ${idx === 2 ? 'Contact Sales' : 'Get Started'}
                    </button>
                `;
      }
    });
  });

  initPricing(container, data);

  return container;
};
