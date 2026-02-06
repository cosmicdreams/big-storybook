# Big Storybook - WebRTC Screen Sharing Components

A production-ready Storybook showcasing HTML components with a focus on WebRTC screen sharing functionality built using the latest Screen Capture API standards.

## 🚀 Features

- **Modern WebRTC Implementation** - Uses cutting-edge `getDisplayMedia` API with latest features (2025-2026 spec)
- **Full Accessibility** - WCAG 2.1 AA compliant with ARIA labels, keyboard navigation, and screen reader support
- **Production-Ready** - Proper error handling, memory leak prevention, and custom event system
- **Multiple Variants** - Basic sharing, current tab preference, system audio capture, and event listeners
- **Responsive Design** - Mobile-friendly with dark mode and reduced motion support
- **Developer-Friendly** - ESLint + Prettier configuration, clean code structure

## 📋 Prerequisites

- Node.js 18+ (required for Storybook 8)
- npm 8+ or yarn 1.22+
- Modern browser with WebRTC support (Chrome 94+, Firefox 66+, Safari 13+)

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/big-storybook.git
cd big-storybook

# Install dependencies
npm install

# Start Storybook development server
npm run storybook
```

Storybook will be available at `http://localhost:6006/`

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run storybook` | Start Storybook dev server on port 6006 |
| `npm run build-storybook` | Build static Storybook for deployment |
| `npm run lint` | Run ESLint on JavaScript files |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |

## 🎨 Components

### WebRTC Screen Sharing

Production-ready screen sharing component with multiple variants:

#### **Basic Screen Sharing**
Default implementation with screen capture functionality.

```javascript
import { createScreenShareComponent } from './stories/WebRTC.stories.js';

const component = createScreenShareComponent();
document.body.appendChild(component);
```

#### **With Current Tab Preference**
Prioritizes the current browser tab in the picker (useful for presentation tools).

```javascript
const component = createScreenShareComponent({
  preferCurrentTab: true
});
```

#### **With System Audio**
Includes system audio capture alongside video.

```javascript
const component = createScreenShareComponent({
  includeAudio: true
});
```

#### **With Event Listeners**
Full integration example with callbacks and custom events.

```javascript
const component = createScreenShareComponent({
  onStateChange: (state, message) => {
    console.log('State changed:', state, message);
  },
  onError: (error) => {
    console.error('Error occurred:', error);
  }
});

// Listen to custom events
component.addEventListener('screenShareStarted', (e) => {
  console.log('Sharing started', e.detail);
});

component.addEventListener('screenShareStopped', () => {
  console.log('Sharing stopped');
});
```

## 🔧 Component API

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `preferCurrentTab` | boolean | `false` | Prioritize current tab in picker (Chrome 94+) |
| `includeAudio` | boolean | `false` | Include system audio capture |
| `onStateChange` | function | `null` | Callback fired on state changes |
| `onError` | function | `null` | Callback fired on errors |

### Custom Events

The component dispatches the following CustomEvents:

| Event Name | Fired When | Event Detail |
|------------|------------|--------------|
| `screenShareStateChange` | Component state changes | `{ state, previousState, message, timestamp }` |
| `screenShareStarted` | Sharing starts | `{ label, width, height, frameRate, displaySurface }` |
| `screenShareStopped` | Sharing stops | `{ timestamp }` |
| `screenShareStoppedByUser` | User stops via browser UI | `{ timestamp }` |
| `screenShareError` | An error occurs | `{ errorName, errorMessage, timestamp }` |
| `trackStopped` | Media track stops | `{ kind, label, timestamp }` |
| `fullscreenEntered` | Fullscreen mode entered | `{ timestamp }` |
| `fullscreenExited` | Fullscreen mode exited | `{ timestamp }` |
| `fullscreenError` | Fullscreen request fails | `{ errorName, errorMessage, timestamp }` |

### Methods

| Method | Description |
|--------|-------------|
| `component.cleanup()` | Stops sharing and removes all event listeners (prevents memory leaks) |

## ♿ Accessibility Features

- **ARIA Support** - Proper roles, labels, and live regions
- **Keyboard Navigation** - Tab for focus, ESC to exit fullscreen
- **Screen Reader** - Announces state changes via `aria-live`
- **Focus Management** - Visible focus indicators with `:focus-visible`
- **Reduced Motion** - Respects `prefers-reduced-motion` preference
- **High Contrast** - Supports `prefers-contrast: high`
- **Color Contrast** - WCAG AA compliant (4.5:1 for text)

## 🌐 Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome/Edge | ✅ Full | v94+ for `preferCurrentTab` |
| Firefox | ✅ Full | v66+ |
| Safari | ⚠️ Partial | macOS 13+, iOS 16+, no `preferCurrentTab` |
| Opera | ✅ Full | v80+ for `preferCurrentTab` |

## 🔒 Security & Privacy

- **HTTPS Required** - Screen sharing only works on HTTPS or localhost
- **User Gesture** - Must be initiated by user action (click)
- **Explicit Consent** - Browser shows native picker for user approval
- **Hall of Mirrors Prevention** - `selfBrowserSurface: 'exclude'` prevents accidental self-capture
- **No XSS Vulnerabilities** - All user data is properly escaped

## 📚 WebRTC Features (2025-2026 Spec)

This component uses the latest Screen Capture API features:

- **`preferCurrentTab`** - Offers current tab prominently in picker
- **`systemAudio`** - Controls system audio availability
- **`selfBrowserSurface: 'exclude'`** - Prevents "hall of mirrors" effect
- **`surfaceSwitching: 'include'`** - Allows switching surfaces during sharing
- **`monitorTypeSurfaces: 'include'`** - Enables monitor selection
- **`cursor: 'always'`** - Always displays cursor in shared content

## 📖 Resources

- [MDN: getDisplayMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia)
- [W3C: Screen Capture Specification](https://w3c.github.io/mediacapture-screen-share/)
- [WICG: preferCurrentTab](https://wicg.github.io/prefer-current-tab/)
- [Chrome: Screen Sharing Controls](https://developer.chrome.com/docs/web-platform/screen-sharing-controls)

## 🏗️ Project Structure

```
big-storybook/
├── .storybook/           # Storybook configuration
│   ├── main.js          # Main config (Vite, addons)
│   └── preview.js       # Preview config
├── stories/             # Story files
│   ├── WebRTC.stories.js     # Screen sharing component
│   ├── Brightview.stories.js # Brightview components
│   └── index.stories.js      # Demo components
├── css/                 # Stylesheets
│   ├── webrtc/         # WebRTC component styles
│   └── brightview/     # Brightview styles
├── .eslintrc.json      # ESLint configuration
├── .prettierrc.json    # Prettier configuration
├── .gitignore          # Git ignore rules
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## 🧪 Development

### Code Quality

We use ESLint and Prettier to maintain code quality:

```bash
# Lint JavaScript files
npm run lint

# Auto-fix lint issues
npm run lint:fix

# Format all files
npm run format

# Check formatting
npm run format:check
```

### Building for Production

```bash
# Build static Storybook
npm run build-storybook

# Output will be in ./storybook-static/
# Deploy this folder to your hosting provider
```

## 🚢 Deployment

The static build can be deployed to:

- **GitHub Pages** - Use the `storybook-static` folder
- **Netlify** - Build command: `npm run build-storybook`, publish directory: `storybook-static`
- **Vercel** - Build command: `npm run build-storybook`, output directory: `storybook-static`
- **Any static hosting** - Upload the `storybook-static` folder

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

ISC

## 🙏 Acknowledgments

- [Storybook](https://storybook.js.org/) - Component development environment
- [WebRTC](https://webrtc.org/) - Real-time communication APIs
- [MDN Web Docs](https://developer.mozilla.org/) - Web technology documentation

---

**Version**: 2.0.0
**Last Updated**: February 2026
**Storybook Version**: 8.4.0
