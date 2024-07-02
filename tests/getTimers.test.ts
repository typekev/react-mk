import { describe, expect, it } from 'vitest';
import getTimers, { getPreviousDelay, accumulateDelays, getDelays, startTimers } from '../src/getTimers';

describe('getTimers function', () => {
  it('should not throw an error when passed an empty array', () => {
    expect(() => getTimers([], () => {})).not.toThrow();
  });

  it('should return 10', () => {
    expect(getPreviousDelay([10, 5], 1)).toBe(10);
  });

  it('should return an array of length 1', () => {
    expect(
      ['Test'].reduce<number[]>(
        (accumulatedDelays, action, index) => accumulateDelays(accumulatedDelays, action, index, [0, 0]),
        [],
      ).length,
    ).toBe(1);
  });

  it('should return an array of length 1', () => {
    expect(getDelays(['Test']).length).toBe(1);
  });

  it('should not throw an error', () => {
    const text = 'Test';
    const actions = [text, text, text];
    const then = () => {};
    const delay = 100;
    const index = 1;
    expect(() => startTimers(actions, then)(delay, index)).not.toThrow();
  });
});
