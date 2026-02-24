import '../../../src/components/shadcn/typography/typography.css';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Typography',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.style.maxWidth = '700px';
    container.innerHTML = `
      <h1 class="ui-h1">The Joke Tax Chronicles</h1>
      <p class="ui-p">Once upon a time, in a far-off land, there was a very peculiar king who decided to tax every joke told in his kingdom.</p>
      <h2 class="ui-h2">The King's Plan</h2>
      <p class="ui-p">The king thought that this would be a great way to raise money for his fancy new castle, which featured a moat filled with actual crocodiles.</p>
      <p class="ui-lead">A lead paragraph that stands out from the rest of the text.</p>
      <div style="margin-top: 2rem;">
        <small class="ui-small">Last updated: February 10, 2024</small>
      </div>
    `;
    return container;
  },
};
