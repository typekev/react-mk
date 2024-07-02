import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { Action, Range } from './types';
import getTimers from './getTimers';
import getTimer from './getTimer';
import { defaultKeyPressDelay } from './constants';

const initialState: string[] = [];

export const backspace = (chars: string[], setChars: Dispatch<SetStateAction<string[]>>) =>
  setChars(chars.length > 1 ? chars.slice(0, -1) : initialState);

export const type = (chars: string[], nextChar: string, setChars: Dispatch<SetStateAction<string[]>>) =>
  setChars((prevChars) => [...prevChars, nextChar]);

const useKeyboard = () => {
  const [chars, setChars] = useState<string[]>(initialState);
  const [remainingChars, setRemainingChars] = useState<string[]>(initialState);
  const [resolver, setResolver] = useState<(() => void) | undefined>();
  const [delayRange, setDelayRange] = useState(defaultKeyPressDelay);
  const charsRef = useRef(chars);

  useEffect(() => {
    charsRef.current = chars;
  }, [chars]);

  useEffect(() => {
    if (remainingChars.length > 0) {
      const [nextChar, ...newRemainingChars] = remainingChars;
      const doType = () => type(charsRef.current, nextChar, setChars);
      const doSetRemainingChars = () => setRemainingChars(newRemainingChars);
      getTimer(nextChar, delayRange).then(doType).then(doSetRemainingChars);
    } else if (resolver) {
      resolver();
      setResolver(undefined);
      setRemainingChars(initialState);
    }
  }, [remainingChars, delayRange, resolver]);

  const setText = (action: Action, keyPressDelayRange: Range) =>
    new Promise<void>((resolve) => {
      setResolver(() => resolve);
      setDelayRange(keyPressDelayRange);
      setChars(initialState);
      if (typeof action === 'string' && action.length > 0) {
        setRemainingChars(action.split(''));
      } else {
        resolve();
      }
    });

  const clearText = (action: Action = '') =>
    new Promise<Action>((resolve) => {
      if (charsRef.current.length === 0) {
        resolve(action);
      } else {
        getTimers(
          charsRef.current,
          () => {
            backspace(charsRef.current, setChars);
            if (charsRef.current.length === 0) resolve(action);
          },
          delayRange,
        );
      }
    });

  const text = chars.join('');

  return { text, setText, clearText };
};

export default useKeyboard;
