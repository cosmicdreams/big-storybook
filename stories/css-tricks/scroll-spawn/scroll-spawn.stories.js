import '../../../src/components/css-tricks/scroll-spawn/scroll-spawn.css';

export default {
  title: 'CSS-Tricks/ScrollSpawn',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => `
    <div class="scroll-spawn-demo">
      <div class="spawn-banner">
        <strong>The "Spawn Point" Initialization</strong> — This component uses the brand new <code>scroll-initial-target: nearest</code> property to load the scroll container directly onto Item 4 without any JavaScript.
      </div>
      
      <div class="scroll-spawn-container">
        <div class="spawn-list">
          <div class="spawn-item">History Log - 01</div>
          <div class="spawn-item">History Log - 02</div>
          <div class="spawn-item">History Log - 03</div>
          <div class="spawn-item spawn-target">Current Checkpoint</div>
          <div class="spawn-item">Future Path - 05</div>
          <div class="spawn-item">Future Path - 06</div>
        </div>
      </div>
    </div>
  `,
};
