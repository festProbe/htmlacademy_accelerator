import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from './app';

let container: HTMLElement | null = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
});

it('render app should be correct', () => {
  act(() => {
    render(<App />, container);
  });
  expect(container?.textContent).toBe('Каталог гитар');
})
