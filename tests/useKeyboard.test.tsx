import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import useKeyboard, { backspace, type } from '../src/useKeyboard';

describe('useKeyboard hook', () => {
  it('should return an empty string by default', () => {
    const TestComponent = () => {
      const { text } = useKeyboard();
      expect(text).toBe('');
      return null;
    };

    render(<TestComponent />);
  });

  it('should set text to "Test" then clear it', async () => {
    const TestComponent = () => {
      const { text, setText } = useKeyboard();

      return (
        <>
          <button data-testid="set" onClick={() => setText('Test', [0, 0])} />
          <button data-testid="clear" onClick={() => setText('', [0, 0])} />
          <p data-testid="p">{text}</p>
        </>
      );
    };

    const { getByTestId } = render(<TestComponent />);

    const p = getByTestId('p');
    getByTestId('set').click();
    await waitFor(async () => expect(p.textContent).toBe('Test'));

    getByTestId('clear').click();
    await waitFor(async () => expect(p.textContent).toBe(''));
  });

  it('backspace function returns undefined and does not throw when chars is greater than 1', () => {
    const chars = ['a', 'b', 'c'];
    expect(backspace(chars, () => {})).toBe(undefined);
  });

  it('backspace function returns undefined and does not throw when chars is empty', () => {
    const chars = [];
    expect(backspace(chars, () => {})).toBe(undefined);
  });

  it('type function returns undefined and does not throw', () => {
    const chars = ['a', 'b', 'c'];
    const char = 'd';
    expect(type(chars, char, () => {})).toBe(undefined);
  });
});
