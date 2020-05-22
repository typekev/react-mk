import getDelay from '../src/getDelay';

describe('getDelay function', () => {
  it('should not throw an error when passed a string', () => {
    expect(() => getDelay('Test')).not.toThrow();
  });

  it('should equal 100', () => {
    const delay = getDelay('A', [100, 100]);
    expect(delay).toBe(100);
  });

  it('should equal 400', () => {
    const delay = getDelay('Test', [100, 100]);
    expect(delay).toBe(400);
  });

  it('should equal 1000', () => {
    const delay = getDelay(1000);
    expect(delay).toBe(1000);
  });
});
