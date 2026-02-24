import { expect, userEvent, within, waitFor } from '@storybook/test';
import '../../../src/components/baseline/navigation/navigation.css';

export default {
  title: 'Baseline/Navigation',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    fetchDelay: { control: { type: 'range', min: 0, max: 2000, step: 100 } },
  },
};

const NavigationTemplate = (args) => {
  const container = document.createElement('div');
  container.className = 'nav-container';
  container.innerHTML = `
    <div class="loading-bar" id="loading-bar"></div>
    <header class="nav-toolbar">
      <div class="nav-brand">${args.brandName || 'NavAPI Explorer'}</div>
      <nav class="nav-links">
        <a href="#home" class="nav-link" data-route="home">Home</a>
        <a href="#features" class="nav-link" data-route="features">Features</a>
        <a href="#history" class="nav-link" data-route="history">History</a>
      </nav>
    </header>

    <main id="app-content" class="nav-display">
      <div id="route-panel"></div>
    </main>

    <section id="history-panel" class="history-section">
      <h4>Navigation History (Native)</h4>
      <div id="entries-list"></div>
    </section>
  `;

  const routes = {
    home: { title: 'Welcome Home', content: 'Explore the modern Navigation API.' },
    features: {
      title: 'Async Navigation',
      content: 'Native support for intercepting navigations.',
    },
    history: { title: 'Timeline Travel', content: 'Visualize your navigation history easily.' },
  };

  const renderRoute = (path) => {
    const route = routes[path] || routes.home;
    const panel = container.querySelector('#route-panel');
    if (panel) {
      panel.innerHTML = `<h3>${route.title}</h3><p>${route.content}</p>`;
    }
    container
      .querySelectorAll('.nav-link')
      .forEach((l) => l.classList.toggle('active', l.dataset.route === path));
    if (window.navigation) {
      renderHistory();
    }
  };

  const renderHistory = () => {
    const list = container.querySelector('#entries-list');
    if (list) {
      list.innerHTML = window.navigation
        .entries()
        .map(
          (entry) => `
              <div class="history-entry ${entry === window.navigation.currentEntry ? 'active' : ''}">
                <span>${entry.url.split('#').pop() || 'index'}</span>
              </div>
            `,
        )
        .join('');
    }
  };

  if (window.navigation) {
    // Clean up previous listeners if any (not strictly possible with anonymous funcs, but okay for storybook re-renders)
    window.navigation.onclick = null;

    window.navigation.addEventListener('navigate', (e) => {
      if (!e.canIntercept || e.downloadRequest) {
        return;
      }
      e.intercept({
        async handler() {
          const bar = container.querySelector('#loading-bar');
          if (bar) {
            bar.style.width = '40%';
          }
          await new Promise((r) => setTimeout(r, args.fetchDelay || 400));
          if (bar) {
            bar.style.width = '100%';
          }
          const path = new URL(e.destination.url).hash.replace('#', '') || 'home';
          renderRoute(path);
          setTimeout(() => {
            if (bar) {
              bar.style.width = '0';
            }
          }, 200);
        },
      });
    });
  }

  container.addEventListener('click', (e) => {
    const link = e.target.closest('.nav-link');
    if (link && window.navigation) {
      e.preventDefault();
      window.navigation.navigate(link.href, { state: args?.state });
    }
  });

  setTimeout(() => renderRoute('home'), 0);
  return container;
};

export const SPARouter = {
  render: NavigationTemplate,
  args: {
    brandName: 'NavAPI Explorer',
    fetchDelay: 400,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByText('Features');

    await step('Navigate to Features', async () => {
      await userEvent.click(link);
      await waitFor(() => expect(canvas.getByText('Async Navigation')).toBeVisible());
    });
  },
};

export const HistoryExplorer = {
  render: NavigationTemplate,
  args: {
    brandName: 'History Timeline',
    fetchDelay: 200,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify history tracking', async () => {
      await userEvent.click(canvas.getByText('Features'));
      await userEvent.click(canvas.getByText('Home'));
      const entries = canvasElement.querySelectorAll('.history-entry');
      expect(entries.length).toBeGreaterThan(0);
    });
  },
};

export const StatePersistence = {
  render: NavigationTemplate,
  args: {
    brandName: 'Stateful Nav',
    fetchDelay: 300,
    state: { lastVisit: new Date().toISOString(), user: 'BaselineDev' },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Navigate with state', async () => {
      await userEvent.click(canvas.getByText('Features'));
      if (window.navigation) {
        const entry = window.navigation.currentEntry;
        expect(entry.getState()).toHaveProperty('user', 'BaselineDev');
      }
    });
  },
};
