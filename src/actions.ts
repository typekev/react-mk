import type { TypeAction, DeleteAction, PauseAction } from './types';

export const type = (text: string): TypeAction => ({ kind: 'type', text });

export const pause = (ms: number): PauseAction => ({ kind: 'pause', ms });

export const deleteAll = (): DeleteAction => ({ kind: 'delete', count: Infinity });

export const deleteChars = (count: number): DeleteAction => ({ kind: 'delete', count });
