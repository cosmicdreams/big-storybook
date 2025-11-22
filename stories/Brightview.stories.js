/**
 * Brightview Stories - CSF3 Format
 */

// Component templates
import portfolioTeaser from './brightview/portfolio-teaser.html?raw';

// Global CSS
import '../css/brightview/style.css';

export default {
  title: 'Brightview',
};

export const PortfolioItemTeaser = {
  name: 'Portfolio Item teaser',
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = portfolioTeaser;
    return container;
  },
};

export const Button = {
  render: () => {
    const button = document.createElement('button');
    button.type = 'button';
    button.innerText = 'Hello Button';
    button.addEventListener('click', (e) => console.log(e));
    return button;
  },
};
