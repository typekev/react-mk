import { describe, expect, it } from 'vitest';
import { type, pause, deleteAll, deleteChars } from '../src/actions';

describe('action builders', () => {
  it('type() creates a type action', () => {
    expect(type('Hello')).toEqual({ kind: 'type', text: 'Hello' });
  });

  it('type() handles empty string', () => {
    expect(type('')).toEqual({ kind: 'type', text: '' });
  });

  it('pause() creates a pause action', () => {
    expect(pause(1000)).toEqual({ kind: 'pause', ms: 1000 });
  });

  it('pause(0) creates a zero-duration pause', () => {
    expect(pause(0)).toEqual({ kind: 'pause', ms: 0 });
  });

  it('deleteAll() creates a delete action with Infinity count', () => {
    expect(deleteAll()).toEqual({ kind: 'delete', count: Infinity });
  });

  it('deleteChars() creates a delete action with a specific count', () => {
    expect(deleteChars(3)).toEqual({ kind: 'delete', count: 3 });
  });
});
