import getDelay, { addActionDelay } from '../src/getDelay';

describe('getDelay function', () => {
  it('should not throw an error when passed an empty array', () => {
    expect(() => getDelay([])).not.toThrow();
  });

  it('should equal 104', () => {
    const delay = getDelay([[null, 100], [null, 4]]);
    expect(delay).toBe(104);
  });

  it('should equal 20', () => {
    const delay = addActionDelay(7, [null, 13]);
    expect(delay).toBe(20);
  });
});
