import React from 'react';
import ReactDOM from 'react-dom';
import Keyboard from '../src/Keyboard';

describe('Keyboard component', () => {
  it('renders using child string without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Keyboard>Test</Keyboard>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders using child function without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Keyboard>{({ type }) => type(200, 'Test')}</Keyboard>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
