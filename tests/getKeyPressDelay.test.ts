import { describe, expect, it } from 'vitest';
import getKeyPressDelay from '../src/getKeyPressDelay';

describe('getKeyPressDelay function', () => {
  it('should not throw', () => {
    expect(() => getKeyPressDelay(100, 200)).not.toThrow();
  });
});
