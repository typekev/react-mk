import getTimer, { clearTimer, createTimer, getTimeout } from '../src/getTimer';

describe('getTimer function', () => {
  it('should not throw an error when passed a string', () => {
    expect(() => getTimer('Test')).not.toThrow();
  });

  it('should return Test', () => {
    const text = 'Test';
    getTimer(text).then(action => expect(action).toBe(text));
  });

  it('should return Test', () => {
    const text = 'Test';
    expect(clearTimer({ action: text, timer: setTimeout(() => {}, 100) })).toBe(text);
  });

  it('should return a timer, a delay of 400, and a resolve function', () => {
    const text = 'Test';
    const delayRange = [100, 100];

    const { timer } = createTimer(() => {})(text, delayRange);

    expect(typeof timer).toBe(typeof setTimeout(() => {}, delayRange[0]));
  });

  it('should return a timer', () => {
    const text = 'Test';
    const delay = 100;

    const timer = getTimeout(() => {}, text, delay);

    expect(typeof timer).toBe(typeof setTimeout(() => {}, delay));
  });
});
