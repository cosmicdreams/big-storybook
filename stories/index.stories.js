/**
 * Demo Stories - CSF3 Format
 */

export default {
  title: 'Demo',
};

export const Heading = {
  render: () => '<h1>Hello World</h1>',
};

export const Button = {
  render: () => {
    const button = document.createElement('button');
    button.type = 'button';
    button.innerText = 'Hello Button';
    button.addEventListener('click', (e) => console.log(e));
    return button;
  },
};
