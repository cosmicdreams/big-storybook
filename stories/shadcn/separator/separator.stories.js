import '../../../src/components/shadcn/separator/separator.css';
import separatorHtml from '../../../src/components/shadcn/separator/separator.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Separator',
  parameters: {
    layout: 'centered',
  },
};

export const Examples = {
  render: () => {
    const container = document.createElement('div');
    container.style.width = '300px';
    container.innerHTML = `
      <div style="font-weight: 500; font-size: 0.875rem;">Radix Primitives</div>
      <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">An open-source UI component library.</p>
      <div class="ui-separator-container"></div>
      <div style="display: flex; height: 1.25rem; align-items: center; gap: 1rem; font-size: 0.875rem;">
        <div>Blog</div>
        <div class="ui-separator-vertical-container"></div>
        <div>Docs</div>
        <div class="ui-separator-vertical-container"></div>
        <div>Source</div>
      </div>
    `;

    const sepContainer = container.querySelector('.ui-separator-container');
    sepContainer.innerHTML = separatorHtml;

    container.querySelectorAll('.ui-separator-vertical-container').forEach((c) => {
      c.innerHTML = separatorHtml;
      c.firstElementChild.classList.add('ui-separator-vertical');
    });

    return container;
  },
};
