import '../../../src/components/shadcn/pagination/pagination.css';
import paginationHtml from '../../../src/components/shadcn/pagination/pagination.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Pagination',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = paginationHtml;
    const nav = container.querySelector('.ui-pagination');

    nav.innerHTML = `
      <div class="ui-pagination-link" title="Previous"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div>
      <div class="ui-pagination-link">1</div>
      <div class="ui-pagination-link active">2</div>
      <div class="ui-pagination-link">3</div>
      <div style="font-size: 0.875rem; padding: 0 0.5rem; color: hsl(var(--muted-foreground));">...</div>
      <div class="ui-pagination-link" title="Next"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.15833 3.13514C5.95687 3.32401 5.94667 3.64042 6.13554 3.84188L9.56494 7.49991L6.13554 11.1579C5.94667 11.3594 5.95687 11.6758 6.15833 11.8647C6.35979 12.0535 6.67621 12.0433 6.86507 11.8419L10.6151 7.84188C10.7954 7.64955 10.7954 7.35027 10.6151 7.15794L6.86507 3.15794C6.67621 2.95648 6.35979 2.94628 6.15833 3.13514Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div>
    `;

    return container;
  },
};
