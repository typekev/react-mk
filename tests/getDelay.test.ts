import { describe, expect, it } from 'vitest';
import getDelay from '../src/getDelay';

describe('getDelay function', () => {
  it('should not throw an error when passed a string', () => {
    expect(() => getDelay('Test')).not.toThrow();
  });

  it('should calculate delay correctly for single character', () => {
    const delay = getDelay('A', [100, 100]);
    expect(delay).toBe(100);
  });

  it('should calculate delay correctly for multiple characters', () => {
    const delay = getDelay('Test', [100, 100]);
    expect(delay).toBe(400); // Assuming 'Test' has 4 characters, and each gets a delay of 100
  });

  it('should return the delay when passed a number', () => {
    const delay = getDelay(1000);
    expect(delay).toBe(1000);
  });

  // Additional test cases for edge scenarios:
  it('should return 0 when passed an empty string', () => {
    const delay = getDelay('');
    expect(delay).toBe(0);
  });
});
