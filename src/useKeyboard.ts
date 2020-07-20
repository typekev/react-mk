import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { Action, Range } from '../types';
import getTimers from './getTimers';
import getTimer from './getTimer';
import { defaultKeyPressDelay } from './constants';

const initialState: string[] = [];

export const backspace = (chars: string[], setChars: Dispatch<SetStateAction<string[]>>) =>
  setChars(chars.length > 1 ? chars.slice(0, chars.length - 1) : initialState);

export const type = (
  chars: string[],
  nextChar: string,
  setChars: Dispatch<SetStateAction<string[]>>,
) => setChars([...chars, nextChar]);

const useKeyboard = () => {
  const [chars, setChars] = useState<string[]>(initialState);
  const [remainingChars, setRemainingChars] = useState<string[]>(initialState);
  const [resolver, setResolver] = useState<(() => void) | undefined>(undefined);
  const [delayRange, setDelayRange] = useState(defaultKeyPressDelay);
  const charsRef = useRef(chars);

  charsRef.current = chars;

  useEffect(() => {
    /* istanbul ignore next */
    if (remainingChars.length > initialState.length) {
      const [nextChar, ...newRemainingChars] = remainingChars;
      const doType = () => type(chars, nextChar, setChars);
      const doSetRemainingChars = () => setRemainingChars(newRemainingChars);
      getTimer(nextChar, delayRange).then(doType).then(doSetRemainingChars);
    } else if (resolver) {
      resolver();
      setResolver(undefined);
      setRemainingChars(initialState);
    }
  }, [remainingChars]);

  const setText = (action: Action, keyPressDelayRange: Range) =>
    new Promise((resolve) => {
      setResolver(() => resolve);
      setDelayRange(keyPressDelayRange);
      setChars(initialState);
      /* istanbul ignore else */
      if (typeof action === 'string' && action.length > 0) {
        setRemainingChars(action.split(''));
      } else {
        resolve();
      }
    });

  const clearText = (action: Action) =>
    new Promise<Action>((resolve) =>
      /* istanbul ignore next */
      !chars.length
        ? resolve(action)
        : getTimers(
            charsRef.current,
            () => {
              /* istanbul ignore next */
              backspace(charsRef.current, setChars);
              /* istanbul ignore next */
              return charsRef.current.length === 0 && resolve(action);
            },
            delayRange,
          ),
    );

  const text = chars.join('');

  return { text, setText, clearText };
};

export default useKeyboard;
