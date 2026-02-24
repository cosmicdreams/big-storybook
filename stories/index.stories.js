

export default {
  title: 'Introduction',
};

export const Welcome = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.fontFamily = 'sans-serif';
    container.innerHTML = `
      <h1>Welcome to Big Storybook</h1>
      <p>This is a high-performance, production-ready component library.</p>
      <h2>Featured Components</h2>
      <ul>
        <li><strong>WebRTC Screen Sharing</strong>: A robust component for screen capture and recording.</li>
        <li><strong>Brightview Components</strong>: Reusable templates from the Brightview project.</li>
      </ul>
      <div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
        <p>Explore the components in the sidebar to see live demos and interaction tests.</p>
      </div>
    `;
    return container;
  },
};
