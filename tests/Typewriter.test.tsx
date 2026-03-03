import React from 'react';
import { render, act, cleanup } from '@testing-library/react';
import { describe, expect, it, vi, afterEach, beforeEach } from 'vitest';
import Typewriter from '../src/Typewriter';
import type { DelayRange } from '../src/types';

const INSTANT: DelayRange = [0, 0];

describe('Typewriter component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('types a simple string', async () => {
    const { getByTestId } = render(
      <p data-testid="p">
        <Typewriter typeSpeed={INSTANT}>Hello</Typewriter>
      </p>,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(getByTestId('p').textContent).toBe('Hello');
  });

  it('types a number converted to string', async () => {
    const { getByTestId } = render(
      <p data-testid="p">
        <Typewriter typeSpeed={INSTANT}>{42}</Typewriter>
      </p>,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(getByTestId('p').textContent).toBe('42');
  });

  it('supports function children with action builders', async () => {
    const { getByTestId } = render(
      <p data-testid="p">
        <Typewriter typeSpeed={INSTANT} deleteSpeed={INSTANT}>
          {({ type, pause, deleteAll }) => [type('Hello'), pause(0), deleteAll(), type('World')]}
        </Typewriter>
      </p>,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    expect(getByTestId('p').textContent).toBe('World');
  });

  it('cycles through sentences', async () => {
    const onFinish = vi.fn();
    const { getByTestId } = render(
      <p data-testid="p">
        <Typewriter
          sentences={['First', 'Second']}
          sentenceDelay={0}
          typeSpeed={INSTANT}
          deleteSpeed={INSTANT}
          onFinish={onFinish}
        />
      </p>,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    // Should end with the last sentence
    expect(getByTestId('p').textContent).toBe('Second');
    expect(onFinish).toHaveBeenCalled();
  });

  it('prefers sentences over children when both are provided', async () => {
    const { getByTestId } = render(
      <p data-testid="p">
        <Typewriter sentences={['Sentence']} typeSpeed={INSTANT} deleteSpeed={INSTANT}>
          Ignored
        </Typewriter>
      </p>,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(getByTestId('p').textContent).toBe('Sentence');
  });

  it('renders nothing when no children or sentences', async () => {
    const { getByTestId } = render(
      <p data-testid="p">
        <Typewriter typeSpeed={INSTANT} />
      </p>,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(getByTestId('p').textContent).toBe('');
  });

  it('loops sentences when loop is enabled', async () => {
    const onLoop = vi.fn();
    render(
      <Typewriter
        sentences={['Hi']}
        sentenceDelay={0}
        typeSpeed={INSTANT}
        deleteSpeed={INSTANT}
        loop={2}
        loopDelay={0}
        onLoop={onLoop}
      />,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    expect(onLoop).toHaveBeenCalledWith(1);
  });

  it('supports the deleteChars builder in function children', async () => {
    const { getByTestId } = render(
      <p data-testid="p">
        <Typewriter typeSpeed={INSTANT} deleteSpeed={INSTANT}>
          {({ type, deleteChars }) => [type('Hello'), deleteChars(3)]}
        </Typewriter>
      </p>,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(getByTestId('p').textContent).toBe('He');
  });
});
