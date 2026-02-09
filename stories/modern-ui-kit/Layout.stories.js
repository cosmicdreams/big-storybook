import '../../css/modern-ui-kit/globals.css';
import '../../css/modern-ui-kit/components.css';

export default {
    title: 'Modern UI Kit/Layout',
    parameters: {
        layout: 'centered',
    },
};

export const Tables = {
    render: () => `
    <div class="ui-table-container" style="width: 700px;">
      <table class="ui-table">
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Status</th>
            <th>Method</th>
            <th style="text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-weight: 500;">INV001</td>
            <td>Paid</td>
            <td>Credit Card</td>
            <td style="text-align: right;">$250.00</td>
          </tr>
          <tr>
            <td style="font-weight: 500;">INV002</td>
            <td>Pending</td>
            <td>PayPal</td>
            <td style="text-align: right;">$150.00</td>
          </tr>
          <tr>
            <td style="font-weight: 500;">INV003</td>
            <td>Unpaid</td>
            <td>Bank Transfer</td>
            <td style="text-align: right;">$350.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
};

export const Breadcrumbs = {
    render: () => `
    <nav class="ui-breadcrumb">
      <div class="ui-breadcrumb-item">
        <a href="#" class="ui-breadcrumb-link">Home</a>
      </div>
      <span class="ui-breadcrumb-separator">/</span>
      <div class="ui-breadcrumb-item">
        <a href="#" class="ui-breadcrumb-link">Components</a>
      </div>
      <span class="ui-breadcrumb-separator">/</span>
      <div class="ui-breadcrumb-item">
        <span class="ui-breadcrumb-page">Breadcrumb</span>
      </div>
    </nav>
  `
};

export const Typography = {
    render: () => `
    <div style="max-width: 700px;">
      <h1 class="ui-h1">The Joke Tax Chronicles</h1>
      <p class="ui-p">Once upon a time, in a far-off land, there was a very peculiar king who decided to tax every joke told in his kingdom.</p>
      <h2 class="ui-h2">The King's Plan</h2>
      <p class="ui-p">The king thought that this would be a great way to raise money for his fancy new castle, which featured a moat filled with actual crocodiles.</p>
      <p class="ui-lead">A lead paragraph that stands out from the rest of the text.</p>
      <div style="margin-top: 2rem;">
        <small class="ui-small">Last updated: February 10, 2024</small>
      </div>
    </div>
  `
};

export const Separators = {
    render: () => `
    <div style="width: 300px;">
      <div style="font-weight: 500; font-size: 0.875rem;">Radix Primitives</div>
      <p class="text-muted" style="font-size: 0.875rem;">An open-source UI component library.</p>
      <div class="ui-separator"></div>
      <div style="display: flex; height: 1.25rem; align-items: center; gap: 1rem; font-size: 0.875rem;">
        <div>Blog</div>
        <div class="ui-separator-vertical"></div>
        <div>Docs</div>
        <div class="ui-separator-vertical"></div>
        <div>Source</div>
      </div>
    </div>
  `
};
