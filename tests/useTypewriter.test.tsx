import { render, act, cleanup } from '@testing-library/react';
import { describe, expect, it, vi, afterEach, beforeEach } from 'vitest';
import { useTypewriter } from '../src/useTypewriter';
import { type, pause, deleteAll, deleteChars } from '../src/actions';
import type { Action, DelayRange } from '../src/types';

const INSTANT: DelayRange = [0, 0];

function TypewriterHarness({
  actions,
  options = {},
}: {
  actions: Action[];
  options?: Parameters<typeof useTypewriter>[1];
}) {
  const { text, phase, loopCount } = useTypewriter(actions, options);
  return (
    <div>
      <span data-testid="text">{text}</span>
      <span data-testid="phase">{phase}</span>
      <span data-testid="loopCount">{loopCount}</span>
    </div>
  );
}

describe('useTypewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('returns empty text and complete phase for an empty actions array', () => {
    const { getByTestId } = render(<TypewriterHarness actions={[]} />);
    expect(getByTestId('text').textContent).toBe('');
    expect(getByTestId('phase').textContent).toBe('complete');
  });

  it('types text character by character', async () => {
    const { getByTestId } = render(
      <TypewriterHarness actions={[type('Hi')]} options={{ typeSpeed: INSTANT }} />,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(200);
    });

    expect(getByTestId('text').textContent).toBe('Hi');
    expect(getByTestId('phase').textContent).toBe('complete');
  });

  it('types multi-word text', async () => {
    const { getByTestId } = render(
      <TypewriterHarness actions={[type('Hello World')]} options={{ typeSpeed: INSTANT }} />,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(getByTestId('text').textContent).toBe('Hello World');
  });

  it('deletes all text', async () => {
    const { getByTestId } = render(
      <TypewriterHarness
        actions={[type('Hello'), deleteAll()]}
        options={{ typeSpeed: INSTANT, deleteSpeed: INSTANT }}
      />,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(getByTestId('text').textContent).toBe('');
    expect(getByTestId('phase').textContent).toBe('complete');
  });

  it('deletes a specific number of characters', async () => {
    const { getByTestId } = render(
      <TypewriterHarness
        actions={[type('Hello'), deleteChars(3)]}
        options={{ typeSpeed: INSTANT, deleteSpeed: INSTANT }}
      />,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(getByTestId('text').textContent).toBe('He');
    expect(getByTestId('phase').textContent).toBe('complete');
  });

  it('does not delete more characters than available', async () => {
    const { getByTestId } = render(
      <TypewriterHarness
        actions={[type('Hi'), deleteChars(100)]}
        options={{ typeSpeed: INSTANT, deleteSpeed: INSTANT }}
      />,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(getByTestId('text').textContent).toBe('');
  });

  it('pauses between actions', async () => {
    const { getByTestId } = render(
      <TypewriterHarness
        actions={[type('A'), pause(500), type('B')]}
        options={{ typeSpeed: INSTANT }}
      />,
    );

    // Type 'A' instantly
    await act(async () => {
      await vi.advanceTimersByTimeAsync(50);
    });
    expect(getByTestId('text').textContent).toBe('A');
    expect(getByTestId('phase').textContent).toBe('pausing');

    // After pause, 'B' should be appended
    await act(async () => {
      await vi.advanceTimersByTimeAsync(600);
    });
    expect(getByTestId('text').textContent).toBe('AB');
  });

  it('loops the animation with a fixed number', async () => {
    const onFinish = vi.fn();

    const { getByTestId } = render(
      <TypewriterHarness
        actions={[type('Hi'), deleteAll()]}
        options={{
          typeSpeed: INSTANT,
          deleteSpeed: INSTANT,
          loop: 2,
          loopDelay: 0,
          onFinish,
        }}
      />,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    expect(getByTestId('phase').textContent).toBe('complete');
    expect(onFinish).toHaveBeenCalledOnce();
  });

  it('calls onType callback for each character', async () => {
    const onType = vi.fn();

    render(
      <TypewriterHarness actions={[type('AB')]} options={{ typeSpeed: INSTANT, onType }} />,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(200);
    });

    expect(onType).toHaveBeenCalledTimes(2);
    expect(onType).toHaveBeenCalledWith('A', 'A');
    expect(onType).toHaveBeenCalledWith('B', 'AB');
  });

  it('calls onDelete callback for each character', async () => {
    const onDelete = vi.fn();

    render(
      <TypewriterHarness
        actions={[type('AB'), deleteAll()]}
        options={{ typeSpeed: INSTANT, deleteSpeed: INSTANT, onDelete }}
      />,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(onDelete).toHaveBeenCalledTimes(2);
    expect(onDelete).toHaveBeenCalledWith('B', 'A');
    expect(onDelete).toHaveBeenCalledWith('A', '');
  });

  it('calls onFinish callback when all actions complete', async () => {
    const onFinish = vi.fn();

    render(
      <TypewriterHarness actions={[type('Hi')]} options={{ typeSpeed: INSTANT, onFinish }} />,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(200);
    });

    expect(onFinish).toHaveBeenCalledOnce();
  });

  it('calls onLoop callback with iteration count', async () => {
    const onLoop = vi.fn();

    render(
      <TypewriterHarness
        actions={[type('A'), deleteAll()]}
        options={{
          typeSpeed: INSTANT,
          deleteSpeed: INSTANT,
          loop: 3,
          loopDelay: 0,
          onLoop,
        }}
      />,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    expect(onLoop).toHaveBeenCalledWith(1);
    expect(onLoop).toHaveBeenCalledWith(2);
  });

  it('respects startDelay before typing begins', async () => {
    const { getByTestId } = render(
      <TypewriterHarness
        actions={[type('Hi')]}
        options={{ typeSpeed: INSTANT, startDelay: 500 }}
      />,
    );

    // Before the start delay elapses
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });
    expect(getByTestId('text').textContent).toBe('');
    expect(getByTestId('phase').textContent).toBe('pausing');

    // After start delay
    await act(async () => {
      await vi.advanceTimersByTimeAsync(600);
    });
    expect(getByTestId('text').textContent).toBe('Hi');
  });

  it('cleans up on unmount without errors', async () => {
    const { unmount } = render(
      <TypewriterHarness
        actions={[type('Hello World')]}
        options={{ typeSpeed: [50, 100] }}
      />,
    );

    // Start typing, then unmount mid-animation
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(() => unmount()).not.toThrow();
  });

  it('types then deletes then types again', async () => {
    const { getByTestId } = render(
      <TypewriterHarness
        actions={[type('Hello'), deleteAll(), type('World')]}
        options={{ typeSpeed: INSTANT, deleteSpeed: INSTANT }}
      />,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(getByTestId('text').textContent).toBe('World');
    expect(getByTestId('phase').textContent).toBe('complete');
  });
});
