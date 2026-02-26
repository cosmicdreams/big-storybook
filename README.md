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

### 3. [Codepen](./stories/codepen)
Cinematic landing page effects for high-impact user experiences.
- **Interactive Bento Grid**: The signature Apple-style feature grid with mouse-responsive glow.
- **Retro Grid**: A scrolling 3D perspective "synthwave" floor with a stylized sun.
- **Aurora Text**: Flowing iridescent text gradient effects.
- **Shimmer Button**: High-end shimmering button with animated highlight.

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

## 📦 Deliverable Components

Starting with version 4.0.0, every component in this library is **portable and deliverable**. They follow a strict "Component-First" architecture, making it easy to drop them into any project.

### Standalone Structure
Each component lives in its own directory within `src/components/`:
- `[name].html`: Semantic markup template.
- `[name].css`: Scoped component styles.
- `[name].js`: (Optional) Interactive logic or initialization script.

### Component Categories
| Category | Description | Examples |
|:---|:---|:---|
| `ui` | Core functional components | Button, Card, Dialog, Input, Tabs |
| `premium` | High-impact visual effects | Border Beam, Meteors, Bento Grid |
| `blocks` | Complex layout patterns | Hero Grid, Pricing Toggle |
| `web-components` | encapsulated custom elements | local-iframe |

To use a component, simply copy its folder and link the CSS/JS files in your project.

## 🏗️ Project Structure

```text
big-storybook/
├── src/
│   └── components/       # Standalone, portable component units
│       ├── ui/           # Core UI Elements
│       ├── premium/      # Advanced Visual Effects
│       ├── blocks/       # Complex Page Sections
│       └── web-components/# Custom Element implementations
├── stories/              # Storybook definitions (import from src/components)
├── css/                  # Legacy/Global styles (Transitioning to standalone)
│   ├── globals.css       # Design tokens and base resets
│   └── modern-ui-kit/    # (Deprecated) Old monolithic stylesheets
├── .storybook/           # Storybook configuration
└── README.md             # This guide
```

## 🧪 Testing Architecture

This repo features a robust **Interaction Testing** suite. Every component in the **Modern UI Kit** and **Baseline** set is automatically validated using:
- **Playwright** for real browser rendering (Chromium).
- **Vitest** as the test runner for CI-ready performance.
- **Storybook Play Functions** to simulate user interactions (clicking, typing, state changes).

Total Tests: **70+ Passing**

## 🔒 Security & Performance
- **Zero Runtime Dependencies**: Most components require 0KB of JavaScript to render and animate.
- **Accessibility First**: All components follow WAI-ARIA patterns and use semantic HTML.
- **High Performance**: Native browser APIs are used instead of heavy polyfills or animation libraries.

---

**Version**: 4.0.0 (The Deliverable Library)  
**Status**: 70+ Tests Passing ✅  
**Engine**: Bun + Storybook 10
