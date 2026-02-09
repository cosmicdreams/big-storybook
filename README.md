# Big-Storybook: Fun components I find.

A cutting-edge Storybook library demonstrating the absolute limits of the modern web platform. This repository serves as a high-fidelity gallery of components built using **Baseline 2024/2025** features, pure CSS/HTML, and zero heavy dependencies.

## 🌟 The Three Pillars

### 1. [Baseline Category](./stories/baseline)
Deep dives into the latest browser-native features. No external libraries, no heavy JS—just pure web platform power.
- **Scroll-Driven Animations**: Parallax and reveal effects using native `scroll-timeline`.
- **Anchor Positioning**: Tethered tooltips and menus using the latest 2025 CSS spec.
- **Parent-Aware UI**: Logic-driven styling using the `:has()` selector.
- **Dynamic Color Engine**: Systemic palettes derived via **Color Mix** and **Relative Color Syntax**.
- **Modern Transitions**: Smooth state changes via the **View Transition API**.

### 2. [Modern UI Kit](./stories/modern-ui-kit)
A "Shadcn-inspired" set of 30+ production-ready components built for the modern web.
- **Core Components**: Buttons, Badges, Inputs, Switches, and Labels.
- **Data & Forms**: Advanced tables, OTP inputs, progress bars, and accessible radio groups.
- **Navigation**: Mega menus, functional tabs, breadcrumbs, and carousels.
- **Overlays**: Native `<dialog>` modals, tooltips, and toast notifications.

### 3. [Premium Visuals](./stories/modern-ui-kit/Premium.stories.js)
Cinematic landing page effects for high-impact user experiences.
- **Interactive Bento Grid**: The signature Apple-style feature grid with mouse-responsive glow.
- **Retro Grid**: A scrolling 3D perspective "synthwave" floor with a stylized sun.
- **Border Beam**: A high-end glowing beam that travels along container perimeters.
- **Meteors & Aurora**: Atmospheric particle backgrounds and flowing text gradients.

## 🛠️ Tech Stack & Tooling

- **Runtime**: [Bun](https://bun.sh/) - Ultra-fast package manager and test runner.
- **Environment**: [Storybook 10](https://storybook.js.org/) - The latest component development environment.
- **CSS**: Modern CSS (Variables, `@property`, Container Queries, Grid).
- **Testing**: [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/) - Integrated interaction tests running in real browsers.

## 📋 Prerequisites

- **Bun** (Recommended) or Node.js 20+
- **Modern Browser** (Chrome 125+, Safari 17.4+, or Firefox 128+) to support Baseline 2024 features like `:has()` and Scroll-Driven Animations.

## 🚀 Getting Started

```bash
# Install dependencies
bun install

# Start the Storybook development server
bun run storybook

# Run the automated interaction test suite
bun run test:storybook
```

Storybook will be available at `http://localhost:6006/`

## 📦 Available Scripts

| Script | Description |
|:---|:---|
| `bun run storybook` | Start the development server |
| `bun run test:storybook` | Run all component interaction tests via Vitest + Playwright |
| `bun run build-storybook` | Build a static production version of the showcase |
| `bun run lint` | Run code quality checks |

## 🧪 Testing Architecture

This repo features a robust **Interaction Testing** suite. Every component in the **Modern UI Kit** and **Baseline** set is automatically validated using:
- **Playwright** for real browser rendering (Chromium).
- **Vitest** as the test runner for CI-ready performance.
- **Storybook Play Functions** to simulate user interactions (clicking, typing, state changes).

Total Tests: **68+ Passing**

## 🏗️ Project Structure

```text
big-storybook/
├── .storybook/           # Testing and Preview configuration
├── stories/              # Component definitions
│   ├── baseline/         # Cutting-edge native browser features
│   ├── modern-ui-kit/    # Reusable UI components & Premium effects
│   └── WebRTC.stories.js # Legacy/Specialized Screen Sharing components
├── css/                  # The Styling Hub
│   ├── baseline/         # Feature-specific stylesheets
│   └── modern-ui-kit/    # Design system tokens and component styles
├── package.json          # Modern Bun-based configuration
└── README.md             # This guide
```

## 🔒 Security & Performance
- **Zero Runtime Dependencies**: Most components require 0KB of JavaScript to render and animate.
- **Accessibility First**: All components follow WAI-ARIA patterns and use semantic HTML.
- **High Performance**: Native browser APIs are used instead of heavy polyfills or animation libraries.

---

**Version**: 3.0.0 (The Modern Showcase)  
**Status**: 68 Tests Passing ✅  
**Engine**: Bun + Storybook 10
