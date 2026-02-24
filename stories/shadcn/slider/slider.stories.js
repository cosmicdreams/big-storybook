import '../../../src/components/shadcn/slider/slider.css';
import sliderHtml from '../../../src/components/shadcn/slider/slider.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Slider',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.width = '300px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '1rem';

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.innerHTML = `
        <label style="font-size: 0.875rem; font-weight: 500;">Volume</label>
        <span style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">${args.value}</span>
    `;

    const slWrapper = document.createElement('div');
    slWrapper.innerHTML = sliderHtml;
    const slider = slWrapper.querySelector('input');
    slider.value = args.value;
    slider.min = 0;
    slider.max = 100;

    container.appendChild(header);
    container.appendChild(slWrapper);
    return container;
  },
  args: {
    value: 50,
  },
};
