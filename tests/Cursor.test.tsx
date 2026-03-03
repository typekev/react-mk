import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Cursor from '../src/Cursor';
import { describe, it, afterEach, expect } from 'vitest';

describe('Cursor component', () => {
  afterEach(() => {
    cleanup();
    // Remove injected style tag between tests
    document.getElementById('react-mk-cursor')?.remove();
  });

  it('renders with default pipe character', () => {
    render(<Cursor />);
    expect(screen.getByText('|')).toBeTruthy();
  });

  it('renders with custom children', () => {
    render(<Cursor>_</Cursor>);
    expect(screen.getByText('_')).toBeTruthy();
  });

  it('renders with complex children', () => {
    render(<Cursor>█</Cursor>);
    expect(screen.getByText('█')).toBeTruthy();
  });

  it('applies blink animation by default', () => {
    render(<Cursor data-testid="cursor" />);
    const el = screen.getByTestId('cursor');
    expect(el.style.animation).toContain('react-mk-blink');
    expect(el.style.animation).toContain('step-end');
    expect(el.style.animation).toContain('infinite');
  });

  it('does not apply animation when blink is false', () => {
    render(<Cursor data-testid="cursor" blink={false} />);
    const el = screen.getByTestId('cursor');
    expect(el.style.animation).toBe('');
  });

  it('uses custom blink speed', () => {
    render(<Cursor data-testid="cursor" blinkSpeed={300} />);
    const el = screen.getByTestId('cursor');
    expect(el.style.animation).toContain('300ms');
  });

  it('sets aria-hidden attribute for accessibility', () => {
    render(<Cursor data-testid="cursor" />);
    const el = screen.getByTestId('cursor');
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });

  it('sets the data-react-mk-cursor attribute', () => {
    render(<Cursor data-testid="cursor" />);
    const el = screen.getByTestId('cursor');
    expect(el.hasAttribute('data-react-mk-cursor')).toBe(true);
  });

  it('merges custom styles', () => {
    render(<Cursor data-testid="cursor" style={{ color: 'red' }} />);
    const el = screen.getByTestId('cursor');
    expect(el.style.color).toBe('red');
    // Animation should still be present
    expect(el.style.animation).toContain('react-mk-blink');
  });

  it('passes through additional HTML props', () => {
    render(<Cursor data-testid="cursor" className="custom-cursor" id="my-cursor" />);
    const el = screen.getByTestId('cursor');
    expect(el.className).toBe('custom-cursor');
    expect(el.id).toBe('my-cursor');
  });

  it('injects keyframe styles into document head', () => {
    render(<Cursor />);
    const styleEl = document.getElementById('react-mk-cursor');
    expect(styleEl).toBeTruthy();
    expect(styleEl?.textContent).toContain('react-mk-blink');
    expect(styleEl?.textContent).toContain('prefers-reduced-motion');
  });

  it('does not inject styles when blink is false', () => {
    render(<Cursor blink={false} />);
    const styleEl = document.getElementById('react-mk-cursor');
    expect(styleEl).toBeFalsy();
  });
});
