import '../../css/modern-ui-kit/globals.css';
import '../../css/modern-ui-kit/components.css';

export default {
  title: 'Modern UI Kit/Navigation',
  parameters: {
    layout: 'centered',
  },
};

export const Tabs = {
  render: (args) => {
    const container = document.createElement('div');
    container.className = 'ui-tabs';
    container.style.width = '400px';

    container.innerHTML = `
      <div class="ui-tabs-list">
        <button class="ui-tabs-trigger active" data-tab="account">Account</button>
        <button class="ui-tabs-trigger" data-tab="password">Password</button>
      </div>
      <div class="ui-tabs-content" id="account">
        <div class="ui-card">
          <div class="ui-card-header">
            <h3 class="ui-card-title">Account</h3>
            <p class="ui-card-description">Make changes to your account here. Click save when you're done.</p>
          </div>
          <div class="ui-card-content">
             <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <label style="font-size: 0.875rem; font-weight: 500;">Name</label>
                <input class="ui-input" value="Pedro Duarte">
             </div>
          </div>
          <div class="ui-card-footer">
            <button class="ui-button ui-button-primary">Save changes</button>
          </div>
        </div>
      </div>
      <div class="ui-tabs-content" id="password" style="display: none;">
        <div class="ui-card">
          <div class="ui-card-header">
            <h3 class="ui-card-title">Password</h3>
            <p class="ui-card-description">Change your password here. After saving, you'll be logged out.</p>
          </div>
          <div class="ui-card-content">
             <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <label style="font-size: 0.875rem; font-weight: 500;">New password</label>
                <input type="password" class="ui-input">
             </div>
          </div>
          <div class="ui-card-footer">
            <button class="ui-button ui-button-primary">Save password</button>
          </div>
        </div>
      </div>
    `;

    const triggers = container.querySelectorAll('.ui-tabs-trigger');
    const contents = container.querySelectorAll('.ui-tabs-content');

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        triggers.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.style.display = 'none');

        trigger.classList.add('active');
        container.querySelector(`#${trigger.dataset.tab}`).style.display = 'block';
      });
    });

    return container;
  }
};

export const Menubars = {
  render: () => `
    <div class="ui-menubar">
      <div class="ui-menubar-trigger">File</div>
      <div class="ui-menubar-trigger">Edit</div>
      <div class="ui-menubar-trigger">View</div>
      <div class="ui-menubar-trigger">Profiles</div>
    </div>
  `
};

export const Paginators = {
  render: () => `
    <nav class="ui-pagination">
      <div class="ui-pagination-link" title="Previous"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div>
      <div class="ui-pagination-link">1</div>
      <div class="ui-pagination-link active">2</div>
      <div class="ui-pagination-link">3</div>
      <div style="font-size: 0.875rem; padding: 0 0.5rem; color: hsl(var(--muted-foreground));">...</div>
      <div class="ui-pagination-link" title="Next"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.15833 3.13514C5.95687 3.32401 5.94667 3.64042 6.13554 3.84188L9.56494 7.49991L6.13554 11.1579C5.94667 11.3594 5.95687 11.6758 6.15833 11.8647C6.35979 12.0535 6.67621 12.0433 6.86507 11.8419L10.6151 7.84188C10.7954 7.64955 10.7954 7.35027 10.6151 7.15794L6.86507 3.15794C6.67621 2.95648 6.35979 2.94628 6.15833 3.13514Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div>
    </nav>
  `
};

export const NavigationMenus = {
  render: () => `
    <ul class="ui-nav-menu">
      <li class="ui-nav-item">
        <div class="ui-nav-trigger">Getting Started</div>
        <div class="ui-nav-content">
          <div class="mega-grid">
            <a href="#" class="mega-link">
              <span class="mega-title">Introduction</span>
              <span class="mega-desc">Beautifully designed components built with Radix UI and Tailwind CSS.</span>
            </a>
            <a href="#" class="mega-link">
              <span class="mega-title">Installation</span>
              <span class="mega-desc">How to install dependencies and structure your app.</span>
            </a>
            <a href="#" class="mega-link">
              <span class="mega-title">Typography</span>
              <span class="mega-desc">Styles for headings, paragraphs, lists...etc</span>
            </a>
          </div>
        </div>
      </li>
      <li class="ui-nav-item">
        <div class="ui-nav-trigger">Components</div>
      </li>
      <li class="ui-nav-item">
        <div class="ui-nav-trigger">Documentation</div>
      </li>
    </ul>
  `
};
