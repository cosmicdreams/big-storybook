import { expect, within } from 'storybook/test';
import '../../../src/components/baseline/performance/performance.css';

export default {
  title: 'Baseline/Performance',
  parameters: {
    layout: 'fullscreen',
  },
};

const getNavigationMetrics = () => {
  const [nav] = performance.getEntriesByType('navigation');
  if (!nav) {
    return { ttfb: '0', dom: '0', load: '0' };
  }

  return {
    ttfb: (nav.responseStart - nav.requestStart).toFixed(2),
    dom: nav.domInteractive.toFixed(2),
    load: nav.loadEventEnd.toFixed(2),
  };
};

const getResources = () => {
  return performance
    .getEntriesByType('resource')
    .slice(-10) // Last 10 resources
    .map((res) => ({
      name: res.name.split('/').pop() || res.name,
      duration: res.duration.toFixed(2),
      start: res.startTime.toFixed(2),
      type: res.initiatorType,
    }));
};

export const Dashboard = {
  render: (args) => {
    const metrics = getNavigationMetrics();
    return `
      <div class="perf-container" id="perf-dashboard">
        <header class="perf-header">
          <h1>${args.title}</h1>
          <p>${args.subtitle}</p>
        </header>

        <div class="perf-grid">
          <div class="perf-card">
            <div class="perf-card-title">TTFB</div>
            <div class="perf-card-value">${metrics.ttfb}ms</div>
          </div>
          <div class="perf-card">
            <div class="perf-card-title">DOM Interactive</div>
            <div class="perf-card-value">${metrics.dom}ms</div>
          </div>
          <div class="perf-card">
            <div class="perf-card-title">Full Load</div>
            <div class="perf-card-value">${metrics.load}ms</div>
          </div>
          <div class="perf-card" id="loaf-stat">
            <div class="perf-card-title">LoAF API</div>
            <div class="perf-card-value">Checking...</div>
          </div>
        </div>
      </div>
    `;
  },
  args: {
    title: 'Performance Dashboard',
    subtitle: 'Real-time metrics from Navigation Timing & Performance Timeline',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { level: 1 })).toBeVisible();

    const loafSupported = 'PerformanceLongAnimationFrameTiming' in window;
    const loafStat = canvasElement.querySelector('#loaf-stat .perf-card-value');
    if (loafStat) {
      loafStat.textContent = loafSupported ? 'Supported' : 'N/A';
    }
  },
};

export const ResourceWaterfall = {
  render: (args) => {
    const resources = getResources();
    const maxDuration = Math.max(
      ...resources.map((r) => parseFloat(r.start) + parseFloat(r.duration)),
      1,
    );

    return `
      <div class="perf-container">
        <header class="perf-header">
          <h1>${args.title}</h1>
        </header>

        <div class="waterfall-container">
          ${resources
    .map((res) => {
      const width = ((parseFloat(res.duration) / maxDuration) * 100).toFixed(2);
      const left = ((parseFloat(res.start) / maxDuration) * 100).toFixed(2);
      return `
              <div class="waterfall-row">
                <div class="waterfall-name" title="${res.name}">${res.name}</div>
                <div class="waterfall-bar-container">
                  <div class="waterfall-bar ${res.type}" style="left: ${left}%; width: ${Math.max(width, 1)}%;"></div>
                </div>
                <div style="margin-left: 10px; min-width: 60px;">${res.duration}ms</div>
              </div>
            `;
    })
    .join('')}
        </div>
      </div>
    `;
  },
  args: {
    title: 'Resource Timing Waterfall',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { level: 1 })).toBeVisible();
  },
};
