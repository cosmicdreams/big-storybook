import '../../../src/components/shadcn/navigation-menu/navigation-menu.css';
import navigationMenuHtml from '../../../src/components/shadcn/navigation-menu/navigation-menu.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Navigation Menu',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = navigationMenuHtml;
    const menu = container.querySelector('.ui-nav-menu');

    menu.innerHTML = `
      <li class="ui-nav-item">
        <div class="ui-nav-trigger">Getting Started</div>
        <div class="ui-nav-content">
          <div class="mega-grid">
            <a href="#" class="mega-link">
              <span class="mega-title">Introduction</span>
              <span class="mega-desc">Beautifully designed components built with Radix UI and Tailwind CSS.</span>
            </a>
            <a href="#" class="mega-link">
              <span class="mega-title">Installation</span>
              <span class="mega-desc">How to install dependencies and structure your app.</span>
            </a>
            <a href="#" class="mega-link">
              <span class="mega-title">Typography</span>
              <span class="mega-desc">Styles for headings, paragraphs, lists...etc</span>
            </a>
          </div>
        </div>
      </li>
      <li class="ui-nav-item">
        <div class="ui-nav-trigger">Components</div>
      </li>
      <li class="ui-nav-item">
        <div class="ui-nav-trigger">Documentation</div>
      </li>
    `;

    return container;
  },
};
