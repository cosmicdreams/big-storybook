import '../../../src/components/shadcn/breadcrumb/breadcrumb.css';
import breadcrumbHtml from '../../../src/components/shadcn/breadcrumb/breadcrumb.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Breadcrumb',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = breadcrumbHtml;
    const nav = container.querySelector('.ui-breadcrumb');

    const items = [
      { label: 'Home', href: '#' },
      { label: 'Components', href: '#' },
      { label: 'Breadcrumb', isPage: true },
    ];

    nav.innerHTML = items.map((item, idx) => `
        <div class="ui-breadcrumb-item">
            ${item.isPage ?
    `<span class="ui-breadcrumb-page">${item.label}</span>` :
    `<a href="${item.href}" class="ui-breadcrumb-link">${item.label}</a>`
}
            ${idx < items.length - 1 ?
    '<span class="ui-breadcrumb-separator">/</span>' : ''
}
        </div>
    `).join('');

    return container;
  },
};
