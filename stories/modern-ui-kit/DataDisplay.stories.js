import '../../css/modern-ui-kit/globals.css';
import '../../css/modern-ui-kit/components.css';

export default {
  title: 'Modern UI Kit/Data Display',
  parameters: {
    layout: 'centered',
  },
};

export const Avatars = {
  render: () => `
    <div style="display: flex; gap: 1.5rem; align-items: center;">
      <div class="ui-avatar">
        <img class="ui-avatar-img" src="https://github.com/shadcn.png" alt="@shadcn" />
        <div class="ui-avatar-fallback">CN</div>
      </div>
      <div class="ui-avatar">
        <img class="ui-avatar-img" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="User" />
        <div class="ui-avatar-fallback">JD</div>
      </div>
      <div class="ui-avatar">
        <div class="ui-avatar-fallback">AW</div>
      </div>
    </div>
  `
};

export const ProgressBars = {
  render: (args) => `
    <div style="width: 300px; display: flex; flex-direction: column; gap: 1rem;">
      <div class="ui-progress">
        <div class="ui-progress-value" style="transform: translateX(-${100 - args.value}%);"></div>
      </div>
      <p style="font-size: 0.875rem; text-align: center;">${args.value}% complete</p>
    </div>
  `,
  args: {
    value: 60
  }
};

export const Skeletons = {
  render: () => `
    <div style="display: flex; align-items: center; gap: 1rem; width: 300px;">
      <div class="ui-skeleton" style="height: 3rem; width: 3rem; border-radius: 9999px;"></div>
      <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
        <div class="ui-skeleton" style="height: 1rem; width: 100%;"></div>
        <div class="ui-skeleton" style="height: 1rem; width: 80%;"></div>
      </div>
    </div>
  `
};

export const Carousels = {
  render: () => `
    <div class="ui-carousel">
      <div class="ui-carousel-content">
        <div class="ui-carousel-item">
          <div class="ui-card" style="height: 200px; display: flex; align-items: center; justify-content: center; font-size: 3rem; font-weight: 700; background: hsl(var(--muted));">1</div>
        </div>
        <div class="ui-carousel-item">
          <div class="ui-card" style="height: 200px; display: flex; align-items: center; justify-content: center; font-size: 3rem; font-weight: 700; background: hsl(var(--muted));">2</div>
        </div>
        <div class="ui-carousel-item">
          <div class="ui-card" style="height: 200px; display: flex; align-items: center; justify-content: center; font-size: 3rem; font-weight: 700; background: hsl(var(--muted));">3</div>
        </div>
      </div>
      <button class="ui-carousel-btn ui-carousel-prev" onclick="this.parentElement.querySelector('.ui-carousel-content').scrollBy({left: -350, behavior: 'smooth'})">←</button>
      <button class="ui-carousel-btn ui-carousel-next" onclick="this.parentElement.querySelector('.ui-carousel-content').scrollBy({left: 350, behavior: 'smooth'})">→</button>
    </div>
  `
};
