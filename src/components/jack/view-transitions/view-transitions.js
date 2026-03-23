/**
 * View Transitions API — DrupalCon Session Cards
 *
 * Pairs card elements with detail hero via view-transition-name so the
 * browser morphs them naturally using document.startViewTransition().
 */

const SESSIONS = {
  1: {
    title: 'The Future of CSS: Anchor Positioning & Scroll-Driven Animations',
    speaker: 'Miriam Suzanne',
    track: 'Frontend',
    trackClass: 'dc-track--frontend',
    time: 'Mon 10:00 AM',
    room: 'Hall A',
    description:
      'Dive deep into two of the most powerful new CSS primitives landing in modern browsers. Anchor Positioning lets you tether tooltips and overlays to any element without JavaScript, while Scroll-Driven Animations replace thousands of lines of IntersectionObserver code with a single CSS rule. We\'ll walk through practical use-cases, current browser support, and polyfill strategies for production.',
  },
  2: {
    title: 'Scaling Drupal: Multi-Site Architecture at Enterprise',
    speaker: 'Fabian Franz',
    track: 'Backend',
    trackClass: 'dc-track--backend',
    time: 'Mon 11:30 AM',
    room: 'Hall B',
    description:
      'Running 50+ Drupal sites for a global enterprise is a different beast than running one. This session covers shared configuration management, centralized content API patterns, deployment pipelines that handle inter-site dependencies, and lessons learned from keeping hundreds of editorial teams unblocked. Real war stories, real architecture diagrams, real solutions.',
  },
  3: {
    title: 'Zero-Downtime Deploys with Tugboat and Acquia Cloud',
    speaker: 'Alanna Burke',
    track: 'DevOps',
    trackClass: 'dc-track--devops',
    time: 'Mon 2:00 PM',
    room: 'Workshop 1',
    description:
      'Blue-green deployments on Drupal are hard — cache warming, database updates, and the infamous Drush deploy sequence all conspire against you. This hands-on workshop walks through integrating Tugboat for per-PR preview environments and configuring Acquia pipelines for true zero-downtime production releases. You\'ll leave with working pipeline YAML.',
  },
  4: {
    title: 'Component-Driven Design Systems in Site Studio',
    speaker: 'Cristina Chumillas',
    track: 'UX & Design',
    trackClass: 'dc-track--ux',
    time: 'Tue 9:00 AM',
    room: 'Hall C',
    description:
      'Acquia Site Studio\'s component model is powerful but often underused. This session shows how to build a proper design system on top of it — atomic components, token-driven theming, and a Storybook-first workflow that lets front-end engineers and content editors share a single source of truth. Includes a live demo converting a Figma component library into Site Studio.',
  },
  5: {
    title: 'Mentoring the Next Generation of Drupal Contributors',
    speaker: 'Dries Buytaert',
    track: 'Community',
    trackClass: 'dc-track--community',
    time: 'Tue 11:00 AM',
    room: 'Keynote Hall',
    description:
      'The Drupal community has always been its greatest asset — but how do we make sure it keeps growing? Dries reflects on 20+ years of community building, shares data on contribution trends, and outlines new initiatives to bring the next generation of developers into the fold. Includes a special announcement about the Drupal Certified Developer program.',
  },
  6: {
    title: 'View Transitions API: Native App Feel on the Web',
    speaker: 'Jake Archibald',
    track: 'Frontend',
    trackClass: 'dc-track--frontend',
    time: 'Tue 2:30 PM',
    room: 'Hall A',
    description:
      'The View Transitions API ships in Chromium 111+ and is the first browser primitive that lets you animate between entire page states — or between components within a page. This session covers the mental model (old/new pseudo-elements, view-transition-name pairing), MPA navigation transitions landing in Chrome 126, and how to progressively enhance any web app with zero-framework transitions that feel indistinguishable from native mobile.',
  },
  7: {
    title: 'GraphQL Decoupled Drupal: Lessons from Production',
    speaker: 'Preston So',
    track: 'Backend',
    trackClass: 'dc-track--backend',
    time: 'Wed 10:00 AM',
    room: 'Hall B',
    description:
      'GraphQL Compose is maturing fast, but production decoupled Drupal still surfaces hard problems: N+1 queries, cache invalidation across two runtimes, editorial preview workflows, and auth token rotation. This session shares concrete solutions from large-scale Next.js + Drupal deployments, with emphasis on the patterns that actually hold up under load.',
  },
  8: {
    title: 'Automating Accessibility Audits in CI/CD Pipelines',
    speaker: 'Mike Gifford',
    track: 'DevOps',
    trackClass: 'dc-track--devops',
    time: 'Wed 1:00 PM',
    room: 'Workshop 2',
    description:
      'Accessibility can\'t be bolted on at the end. This workshop shows how to integrate axe-core, Playwright accessibility assertions, and Pa11y into your Drupal CI/CD pipeline so regressions are caught at pull-request time — not in a quarterly audit. We\'ll configure GitHub Actions, set severity thresholds, and discuss which automated checks complement (rather than replace) manual testing.',
  },
};

/**
 * Initialise the demo inside a given root element.
 * Called from the Storybook story so multiple stories can coexist.
 */
export function initViewTransitionsDemo(root) {
  const gridView = root.querySelector('#dc-grid-view');
  const detailView = root.querySelector('#dc-detail-view');
  const backBtn = root.querySelector('#dc-back-btn');
  const cards = root.querySelectorAll('.dc-card');

  // Assign a stable view-transition-name to each card's outer element
  cards.forEach((card) => {
    const id = card.dataset.session;
    card.style.viewTransitionName = `dc-card-${id}`;
  });

  function startTransition(callback) {
    if (!document.startViewTransition) {
      callback();
      return;
    }
    document.startViewTransition(callback);
  }

  function openSession(sessionId) {
    const session = SESSIONS[sessionId];
    if (!session) return;

    // Populate detail view
    root.querySelector('#dc-detail-track').textContent = session.track;
    root.querySelector('#dc-detail-track').className = `dc-detail-track ${session.trackClass}`;
    root.querySelector('#dc-detail-title').textContent = session.title;
    root.querySelector('#dc-detail-speaker').textContent = session.speaker;
    root.querySelector('#dc-detail-time').textContent = session.time;
    root.querySelector('#dc-detail-room').textContent = session.room;
    root.querySelector('#dc-detail-track-text').textContent = session.track;
    root.querySelector('#dc-detail-desc').textContent = session.description;

    // Pair the clicked card's view-transition-name with the detail hero
    // so the browser morphs the card box into the hero band
    const hero = root.querySelector('#dc-detail-hero');
    hero.style.viewTransitionName = `dc-card-${sessionId}`;

    // Give the detail body its own name so it can fade in independently
    const detailBody = root.querySelector('.dc-detail-body');
    detailBody.style.viewTransitionName = 'dc-detail-body';

    startTransition(() => {
      gridView.hidden = true;
      detailView.hidden = false;
    });
  }

  function closeSession() {
    // Clear transition names before reversing so old card isn't frozen
    const hero = root.querySelector('#dc-detail-hero');
    const activeSessionId = [...cards].find(
      (c) => c.style.viewTransitionName === hero.style.viewTransitionName
    )?.dataset?.session;

    startTransition(() => {
      detailView.hidden = true;
      gridView.hidden = false;

      // Reset names after swap so subsequent opens work cleanly
      hero.style.viewTransitionName = '';
      root.querySelector('.dc-detail-body').style.viewTransitionName = '';

      // Re-focus the card that was opened (accessibility)
      if (activeSessionId) {
        const card = root.querySelector(`.dc-card[data-session="${activeSessionId}"]`);
        card?.focus({ preventScroll: true });
      }
    });
  }

  // Card click / keyboard handlers
  cards.forEach((card) => {
    card.addEventListener('click', () => openSession(card.dataset.session));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openSession(card.dataset.session);
      }
    });
  });

  backBtn.addEventListener('click', closeSession);

  // Expose for testing
  return { openSession, closeSession };
}
