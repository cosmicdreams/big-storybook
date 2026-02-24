import '../../../src/components/shadcn/skeleton/skeleton.css';
import skeletonHtml from '../../../src/components/shadcn/skeleton/skeleton.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Skeleton',
  parameters: {
    layout: 'centered',
  },
};

export const Examples = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.gap = '1rem';
    container.style.width = '300px';

    const avSkeleton = document.createElement('div');
    avSkeleton.innerHTML = skeletonHtml;
    const av = avSkeleton.querySelector('div');
    av.style.height = '3rem';
    av.style.width = '3rem';
    av.style.borderRadius = '9999px';

    const textGroup = document.createElement('div');
    textGroup.style.flex = '1';
    textGroup.style.display = 'flex';
    textGroup.style.flexDirection = 'column';
    textGroup.style.gap = '0.5rem';

    const line1 = document.createElement('div');
    line1.innerHTML = skeletonHtml;
    line1.querySelector('div').style.height = '1rem';
    line1.querySelector('div').style.width = '100%';

    const line2 = document.createElement('div');
    line2.innerHTML = skeletonHtml;
    line2.querySelector('div').style.height = '1rem';
    line2.querySelector('div').style.width = '80%';

    textGroup.appendChild(line1);
    textGroup.appendChild(line2);

    container.appendChild(avSkeleton);
    container.appendChild(textGroup);
    return container;
  },
};
