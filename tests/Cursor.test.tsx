import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Cursor from '../src/Cursor';
import { describe, it, afterEach, expect } from 'vitest';

describe('Cursor component', () => {
  afterEach(() => {
    cleanup(); // This will clean up the DOM after each test
  });

  it('renders without crashing', () => {
    render(<Cursor />);
    const cursorElement = screen.getByText('|');
    expect(cursorElement).toBeTruthy();
  });

  it('renders with blink disabled without crashing', () => {
    render(<Cursor blink={false} />);
    const cursorElement = screen.getByText('|');
    expect(cursorElement).toBeTruthy();
  });

  it('renders a child without crashing', () => {
    render(<Cursor>Test</Cursor>);
    const cursorElement = screen.getByText('Test');
    expect(cursorElement).toBeTruthy();
  });
});
