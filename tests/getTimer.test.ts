import { describe, expect, it } from 'vitest';
import getTimer, { clearTimer, createTimer, getTimeout } from '../src/getTimer';
import { Range } from '../src/types';

describe('getTimer function', () => {
  it('should not throw an error when passed a string', () => {
    expect(() => getTimer('Test')).not.toThrow();
  });

  it('should return "Test"', () => {
    const text = 'Test';
    return getTimer(text).then((action) => expect(action).toBe(text));
  });

  it('should return "Test"', () => {
    const text = 'Test';
    expect(clearTimer({ action: text, timer: window.setTimeout(() => {}, 100) })).toBe(text);
  });

  it('should return a timer and delay of 400', () => {
    const text = 'Test';
    const delayRange: Range = [100, 100];

    const { timer, delay } = createTimer(text, delayRange)(() => Promise.resolve());

    expect(typeof timer).toBe('object'); // Check if timer is an object (or adjust as per your timer implementation)
    expect(delay).toBe(delayRange[0] * text.length);
  });

  it('should return a timer', () => {
    const text = 'Test';
    const delay = 100;

    const timer = getTimeout(() => {}, text, delay);

    expect(typeof timer).toBe('object'); // Check if timer is an object (or adjust as per your timer implementation)
  });
});
