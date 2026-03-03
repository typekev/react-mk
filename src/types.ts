import type { HTMLAttributes, ReactNode } from 'react';

export type DelayRange = readonly [min: number, max: number];

export interface TypeAction {
  readonly kind: 'type';
  readonly text: string;
}

export interface DeleteAction {
  readonly kind: 'delete';
  readonly count: number;
}

export interface PauseAction {
  readonly kind: 'pause';
  readonly ms: number;
}

export type Action = TypeAction | DeleteAction | PauseAction;

export type Phase = 'idle' | 'typing' | 'deleting' | 'pausing' | 'complete';

export interface ActionBuilders {
  type: (text: string) => TypeAction;
  pause: (ms: number) => PauseAction;
  deleteAll: () => DeleteAction;
  deleteChars: (count: number) => DeleteAction;
}

export interface TypewriterOptions {
  typeSpeed?: DelayRange;
  deleteSpeed?: DelayRange;
  loop?: boolean | number;
  loopDelay?: number;
  startDelay?: number;
  mistakeChance?: number;
  onType?: (char: string, text: string) => void;
  onDelete?: (char: string, text: string) => void;
  onFinish?: () => void;
  onLoop?: (loopCount: number) => void;
}

export interface UseTypewriterResult {
  text: string;
  phase: Phase;
  loopCount: number;
}

export interface CursorProps extends HTMLAttributes<HTMLSpanElement> {
  blink?: boolean;
  blinkSpeed?: number;
  children?: ReactNode;
}

export interface TypewriterProps extends TypewriterOptions {
  children?: string | number | ((builders: ActionBuilders) => Action[]);
  sentences?: string[];
  sentenceDelay?: number;
}
