import React from 'react';
import ReactDOM from 'react-dom';
import Cursor from '../src/Cursor';

describe('Cursor component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Cursor />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders with blink disabled without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Cursor blink={false} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders a child without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Cursor>Test</Cursor>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
