import '../../../src/components/shadcn/table/table.css';
import tableHtml from '../../../src/components/shadcn/table/table.html?raw';
import '../../../css/modern-ui-kit/globals.css';

export default {
  title: 'Shadcn/Table',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.style.width = '700px';
    container.innerHTML = tableHtml;

    const thead = container.querySelector('thead');
    thead.innerHTML = `
        <tr>
          <th>Invoice</th>
          <th>Status</th>
          <th>Method</th>
          <th style="text-align: right;">Amount</th>
        </tr>
    `;

    const tbody = container.querySelector('tbody');
    const data = [
      { id: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
      { id: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
      { id: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
    ];

    tbody.innerHTML = data.map((item) => `
        <tr>
          <td style="font-weight: 500;">${item.id}</td>
          <td>${item.status}</td>
          <td>${item.method}</td>
          <td style="text-align: right;">${item.amount}</td>
        </tr>
    `).join('');

    return container;
  },
};
