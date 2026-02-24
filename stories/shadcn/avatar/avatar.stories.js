import '../../../src/components/shadcn/avatar/avatar.css';
import avatarHtml from '../../../src/components/shadcn/avatar/avatar.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Avatar',
  parameters: {
    layout: 'centered',
  },
};

export const Mixed = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '1.5rem';
    container.style.alignItems = 'center';

    // Image Avatar 1
    const av1 = document.createElement('div');
    av1.innerHTML = avatarHtml;
    av1.querySelector('img').src = 'https://github.com/shadcn.png';
    av1.querySelector('.ui-avatar-fallback').style.display = 'none';

    // Image Avatar 2
    const av2 = document.createElement('div');
    av2.innerHTML = avatarHtml;
    av2.querySelector('img').src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop';
    av2.querySelector('.ui-avatar-fallback').style.display = 'none';

    // Fallback Avatar
    const av3 = document.createElement('div');
    av3.innerHTML = avatarHtml;
    av3.querySelector('img').style.display = 'none';
    av3.querySelector('.ui-avatar-fallback').innerText = 'AW';

    container.appendChild(av1);
    container.appendChild(av2);
    container.appendChild(av3);
    return container;
  },
};
