import getTimers, { delayPerChar, doSetAction } from '../src/getTimers';

describe('getTimers function', () => {
  it('should not throw an error when passed an empty array', () => {
    expect(() => getTimers([], () => {})).not.toThrow();
  });

  it('should not throw an error', () => {
    const action = 'Test';
    const timers = getTimers([action], () => {});
    expect(timers[0][1]).toBe(action.length * delayPerChar);
  });

  it('should equal 100', () => {
    const action = 100;
    const timers = getTimers([action], () => {});
    expect(timers[0][1]).toBe(100);
  });

  it('should return Test', () => {
    const action = 'Test';
    expect(doSetAction(action, a => a)()).toBe(action);
  });
});
