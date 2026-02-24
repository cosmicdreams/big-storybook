import '../../../src/components/shadcn/accordion/accordion.css';
import accordionHtml from '../../../src/components/shadcn/accordion/accordion.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Accordion',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.style.width = '450px';
    container.innerHTML = accordionHtml;
    const accordion = container.querySelector('.ui-accordion');

    const items = [
      { q: 'Is it accessible?', a: 'Yes. It adheres to the WAI-ARIA design pattern.' },
      { q: 'Is it styled?', a: 'Yes. It comes with default styles that matches the other components\' aesthetic.' },
      { q: 'Is it animated?', a: 'Yes. It uses native Baseline features for smooth transitions.' },
    ];

    items.forEach((item) => {
      const details = document.createElement('details');
      details.className = 'ui-accordion-item';
      details.name = 'shadcn-acc';
      details.innerHTML = `
            <summary class="ui-accordion-trigger">${item.q} <span>▼</span></summary>
            <div class="ui-accordion-content">${item.a}</div>
        `;
      accordion.appendChild(details);
    });

    return container;
  },
};
