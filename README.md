# Big-Storybook

A personal gallery and reuse library of web platform ideas. Components are standalone, portable, and built using **Baseline 2024/2025** browser features — pure CSS/HTML with zero heavy dependencies.

## Getting Started

```bash
bun install
bun run storybook        # dev server at localhost:6006
bun run test:storybook   # full interaction test suite
```

Requires a modern browser (Chrome 125+, Safari 17.4+, Firefox 128+) for Baseline 2024 features.

---

## Component Categories

### [Baseline](./stories/baseline)
Deep dives into cutting-edge browser-native CSS and HTML. No external libraries, no heavy JS.

| Component | Feature |
|:---|:---|
| `accordion` | Native `<details>`/`<summary>` with CSS transitions |
| `anchor-positioning` | Tethered tooltips and menus using the 2025 CSS spec |
| `at-property` | Animatable custom properties via `@property` |
| `color-system` | Systemic palettes via `color-mix()` and relative color syntax |
| `container-queries` | Component-level responsive layout |
| `gallery` | Scroll-driven image gallery |
| `navigation` | Disclosure navigation with `:has()` |
| `performance` | Content-visibility and rendering optimizations |
| `popover` | Native `popover` API with anchor positioning |
| `scroll-driven` | Parallax and reveal effects via native `scroll-timeline` |
| `smart-cards` | `:has()`-driven interactive card states |
| `spiral-text` | SVG text path animation |
| `transitions` | View Transition API demos |
| `typography` | Fluid type with `clamp()` and viewport units |

### [Shadcn](./stories/shadcn)
Shadcn-inspired production-ready components with a shared design token system.

**Core**: Button, Badge, Input, Checkbox, Radio, Switch, Slider, Separator
**Data & Forms**: Table, Progress, OTP Input, Command Menu
**Navigation**: Tabs, Breadcrumb, Pagination, Navigation Menu, Menubar
**Overlays**: Dialog, Toast, Tooltip, Popover
**Layout**: Card, Accordion, Avatar, Carousel, Skeleton, Typography

### [Codepen](./stories/codepen)
Cinematic landing page effects sourced and adapted from the web.

| Component | Effect |
|:---|:---|
| `aurora-text` | Flowing gradient text animation |
| `bento-grid` | Apple-style feature grid with mouse-responsive glow |
| `border-beam` | Glowing beam traveling along container perimeters |
| `meteors` | Atmospheric particle rain background |
| `retro-grid` | Scrolling 3D perspective synthwave floor |
| `shimmer-button` | Shimmer sweep CTA button |

### [CSS-Tricks](./stories/css-tricks)
Explorations of modern CSS techniques.

| Component | Technique |
|:---|:---|
| `discoverability` | Hover-reveal UI patterns |
| `interest-invoker` | `interest-target` API experiments |
| `proximity` | Distance-based CSS hover effects |
| `scroll-shadow` | Scroll-position-aware overflow shadows |
| `scroll-snap-reveal` | Snap-point triggered animations |
| `scroll-spawn` | Elements spawned by scroll position |
| `scroll-switchback` | Alternating scroll-driven layouts |

### [Blocks](./stories/library)
Complex layout patterns ready to drop into a page.

- `hero-grid` — Asymmetric hero with image grid
- `pricing` — Pricing toggle with animated tier cards

### [Library](./stories/library)
- `gallery` — Masonry-style filterable image gallery

### [Web Components](./stories/web-components)
Encapsulated custom elements.

- `share-webrtc` — Peer-to-peer screen sharing via WebRTC
- `local-iframe` — Sandboxed iframe wrapper with templating

---

## Tech Stack

| Tool | Purpose |
|:---|:---|
| [Bun](https://bun.sh/) | Package manager and test runner |
| [Storybook 10](https://storybook.js.org/) | Component development environment |
| [Vite](https://vitejs.dev/) | Build tooling |
| [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/) | Interaction tests in real browsers |

## Getting Started

```bash
bun install
bun run storybook        # dev server at localhost:6006
bun run test:storybook   # full interaction test suite
```

Requires a modern browser (Chrome 125+, Safari 17.4+, Firefox 128+) for Baseline 2024 features.

## Component Architecture

Every component follows a standalone, portable structure:

```
src/components/[category]/[name]/
├── [name].html    # semantic markup
├── [name].css     # scoped styles
└── [name].js      # (optional) interaction logic
```

To reuse a component, copy its folder and link the CSS/JS in your project.

```
big-storybook/
├── src/
│   └── components/
│       ├── baseline/       # Browser-native feature demos
│       ├── shadcn/         # Shadcn-inspired UI kit
│       ├── codepen/        # Premium visual effects
│       ├── css-tricks/     # CSS technique explorations
│       ├── blocks/         # Page section patterns
│       ├── library/        # General-purpose components
│       └── web-components/ # Custom element implementations
├── stories/                # Storybook story files
├── css/
│   └── modern-ui-kit/      # Shared design tokens (globals.css)
└── .storybook/             # Storybook configuration
```

## Testing

Interaction tests run via Playwright (Chromium) + Vitest, using Storybook play functions to simulate clicks, typing, and state changes.

```bash
bun run test:storybook
```

---

**Engine**: Bun + Storybook 10
