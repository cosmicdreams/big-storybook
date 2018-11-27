import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

// Component templates
import portfolioTeaser from './brightview/portfolio-teaser.html'

// Global css
import '../css/brightview/style.css';

storiesOf('Brightview', module)
    .add('Portfolio Item teaser', () => portfolioTeaser)
    .add('button', () => {
        const button = document.createElement('button');
        button.type = 'button';
        button.innerText = 'Hello Button';
        button.addEventListener('click', e => console.log(e));
        return button;
    });
