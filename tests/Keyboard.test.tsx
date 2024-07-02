import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import Keyboard, { type as typeFunction } from '../src/Keyboard';

beforeEach(() => {
  cleanup();
});

describe('Keyboard component', () => {
  it('renders a child with the value "Test"', async () => {
    const { getByTestId } = render(
      <p data-testid="p">
        <Keyboard>Test</Keyboard>
      </p>,
    );

    const p = getByTestId('p');
    await waitFor(async () => expect(p.textContent).toBe('Test'));
  });

  it('renders a child with the value "Test" using type function', async () => {
    const { getByTestId } = render(
      <p data-testid="p">
        <Keyboard>{({ type }) => type('Test')}</Keyboard>
      </p>,
    );

    const p = getByTestId('p');
    await waitFor(async () => expect(p.textContent).toBe('Test'));
  });

  it('returns an array of length 4 from type function', () => {
    const text = 'Test';
    assert(typeFunction(text, text, text, text).length === 4, 'Array length is 4');
  });
});

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
