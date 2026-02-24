import '../../../src/components/shadcn/card/card.css';
import cardHtml from '../../../src/components/shadcn/card/card.html?raw';
import '../../../src/components/shadcn/button/button.css';
import buttonHtml from '../../../src/components/shadcn/button/button.html?raw';
import '../../../src/components/shadcn/input/input.css';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Card',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: (args) => {
    const container = document.createElement('div');
    container.innerHTML = cardHtml;
    const card = container.querySelector('.ui-card');
    card.style.width = '380px';

    card.querySelector('.ui-card-title').innerText = args.title;
    card.querySelector('.ui-card-description').innerText = args.description;

    const content = card.querySelector('.ui-card-content');
    content.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="display: flex; flex-direction: column; gap: 0.25rem;">
            <label style="font-size: 0.75rem; font-weight: 500; color: hsl(var(--muted-foreground));">USERNAME</label>
            <input type="text" class="ui-input" placeholder="@shadcn">
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.25rem;">
            <label style="font-size: 0.75rem; font-weight: 500; color: hsl(var(--muted-foreground));">BIO</label>
            <textarea class="ui-input" style="height: 80px; resize: none;" placeholder="Tell us about yourself..."></textarea>
          </div>
        </div>
    `;

    const footer = card.querySelector('.ui-card-footer');
    footer.style.justifyContent = 'flex-end';

    const btnWrapper = document.createElement('div');
    btnWrapper.innerHTML = buttonHtml;
    const btn = btnWrapper.querySelector('button');
    btn.classList.add('ui-button-primary');
    btn.innerText = 'Save Changes';
    footer.appendChild(btnWrapper);

    return container;
  },
  args: {
    title: 'Edit Profile',
    description: "Make changes to your profile here. Click save when you're done.",
  },
};
