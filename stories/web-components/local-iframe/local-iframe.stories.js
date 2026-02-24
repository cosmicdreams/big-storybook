import '../../../src/components/web-components/local-iframe/local-iframe.js';
import '../../../src/components/web-components/local-iframe/local-iframe.css';
import defaultTemplate from '../../../src/components/web-components/local-iframe/default-template.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Web Components/Local Iframe',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    srcdoc: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
  },
};

export const Basic = {
  render: (args) => `
    <div style="width: 600px;">
      <local-iframe style="width: ${args.width || '100%'}; height: ${args.height || '300px'};">
        <template>
          ${args.srcdoc || defaultTemplate}
        </template>
      </local-iframe>
    </div>
  `,
};

export const RemoteContent = {
  render: () => `
    <div style="width: 600px;">
      <p style="margin-bottom: 1rem; font-size: 0.875rem; color: hsl(var(--muted-foreground));">
        Demonstrating loading external content (though local-iframe is optimized for local strings/blobs).
      </p>
      <local-iframe style="width: 100%; height: 400px;">
        <iframe src="https://example.com" style="width: 100%; height: 100%; border: none;"></iframe>
      </local-iframe>
    </div>
  `,
};

export const Interactive = {
  render: () => `
    <div style="width: 600px; display: flex; flex-direction: column; gap: 1rem;">
      <local-iframe id="interactive-iframe" style="width: 100%; height: 200px;">
        <template>
          <button id="btn">Click Me</button>
          <script>
            document.getElementById('btn').onclick = () => alert('Button in iframe clicked!');
          </script>
        </template>
      </local-iframe>
      <button class="ui-button ui-button-outline" onclick="document.getElementById('interactive-iframe').innerHTML = '<template><h1>Updated!</h1></template>';">
        Update Iframe Content
      </button>
    </div>
  `,
};
