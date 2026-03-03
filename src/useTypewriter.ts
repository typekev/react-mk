import { useState, useEffect, useRef } from 'react';
import type { Action, DelayRange, Phase, TypewriterOptions, UseTypewriterResult } from './types';
import { DEFAULT_TYPE_SPEED, DEFAULT_DELETE_SPEED } from './constants';

const KEYBOARD_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

const KEYBOARD_NEIGHBORS = /* @__PURE__ */ (() => {
  const map = new Map<string, string[]>();
  for (const row of KEYBOARD_ROWS) {
    for (let i = 0; i < row.length; i++) {
      const neighbors: string[] = [];
      if (i > 0) neighbors.push(row[i - 1]);
      if (i < row.length - 1) neighbors.push(row[i + 1]);
      map.set(row[i], neighbors);
    }
  }
  return map;
})();

function getNearbyChar(char: string): string {
  const lower = char.toLowerCase();
  const neighbors = KEYBOARD_NEIGHBORS.get(lower);
  if (!neighbors || neighbors.length === 0) return char;
  const nearby = neighbors[Math.floor(Math.random() * neighbors.length)];
  return char === char.toUpperCase() ? nearby.toUpperCase() : nearby;
}

function randomInRange([min, max]: Readonly<DelayRange>): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export function useTypewriter(
  actions: Action[],
  options: TypewriterOptions = {},
): UseTypewriterResult {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [loopCount, setLoopCount] = useState(0);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const actionsKey = JSON.stringify(actions);

  useEffect(() => {
    setText('');
    setPhase('idle');
    setLoopCount(0);

    if (actions.length === 0) {
      setPhase('complete');
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let pendingResolve: (() => void) | undefined;

    const wait = (ms: number): Promise<void> =>
      new Promise((resolve) => {
        pendingResolve = resolve;
        timeoutId = setTimeout(() => {
          pendingResolve = undefined;
          resolve();
        }, ms);
      });

    async function run() {
      const opts = () => optionsRef.current;

      if (opts().startDelay) {
        setPhase('pausing');
        await wait(opts().startDelay!);
        if (cancelled) return;
      }

      let localLoopCount = 0;

      // eslint-disable-next-line no-constant-condition
      while (true) {
        let currentText = '';
        setText('');

        for (const action of actions) {
          if (cancelled) return;

          switch (action.kind) {
            case 'type': {
              setPhase('typing');
              for (const char of action.text) {
                if (cancelled) return;

                await wait(randomInRange(opts().typeSpeed ?? DEFAULT_TYPE_SPEED));
                if (cancelled) return;

                const mistakeChance = opts().mistakeChance ?? 0;
                if (mistakeChance > 0 && Math.random() < mistakeChance) {
                  const mistake = getNearbyChar(char);
                  currentText += mistake;
                  setText(currentText);

                  await wait(randomInRange([200, 400]));
                  if (cancelled) return;

                  currentText = currentText.slice(0, -1);
                  setText(currentText);

                  await wait(randomInRange([80, 150]));
                  if (cancelled) return;
                }

                currentText += char;
                setText(currentText);
                opts().onType?.(char, currentText);
              }
              break;
            }

            case 'delete': {
              setPhase('deleting');
              const count =
                action.count === Infinity
                  ? currentText.length
                  : Math.min(action.count, currentText.length);

              for (let i = 0; i < count; i++) {
                if (cancelled) return;

                await wait(randomInRange(opts().deleteSpeed ?? DEFAULT_DELETE_SPEED));
                if (cancelled) return;

                const deleted = currentText[currentText.length - 1];
                currentText = currentText.slice(0, -1);
                setText(currentText);
                opts().onDelete?.(deleted, currentText);
              }
              break;
            }

            case 'pause': {
              setPhase('pausing');
              await wait(action.ms);
              if (cancelled) return;
              break;
            }
          }
        }

        if (cancelled) return;

        const loopOpt = opts().loop;
        const shouldLoop =
          loopOpt === true ||
          (typeof loopOpt === 'number' && localLoopCount < loopOpt - 1);

        if (!shouldLoop) {
          setPhase('complete');
          opts().onFinish?.();
          return;
        }

        localLoopCount++;
        setLoopCount(localLoopCount);
        opts().onLoop?.(localLoopCount);

        const loopDelay = opts().loopDelay;
        if (loopDelay) {
          setPhase('pausing');
          await wait(loopDelay);
          if (cancelled) return;
        }
      }
    }

    run();

    return () => {
      cancelled = true;
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      pendingResolve?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionsKey]);

  return { text, phase, loopCount };
}
