import { useState, useRef, useEffect } from 'react';
import getTimers from './getTimers';
import getTimer from './getTimer';

const initialState = '';

export const backspace = (chars, setChars) =>
  setChars(chars.length > 1 ? chars.slice(0, chars.length - 1) : initialState);

export const type = (chars, nextChar, setChars) => setChars(`${chars}${nextChar}`);

export default function useKeyboard() {
  const [chars, setChars] = useState(initialState);
  const [remainingChars, setRemainingChars] = useState(initialState);
  const [resolver, setResolver] = useState(undefined);

  const charsRef = useRef(chars);
  charsRef.current = chars;

  useEffect(() => {
    /* istanbul ignore else */
    if (remainingChars.length > initialState.length) {
      const [nextChar, ...newRemainingChars] = remainingChars;
      /* istanbul ignore next */
      const doType = () => type(chars, nextChar, setChars);
      /* istanbul ignore next */
      const doSetRemainingChars = () => setRemainingChars(newRemainingChars);
      getTimer(nextChar)
        .then(doType)
        .then(doSetRemainingChars);
    } else if (typeof resolver === 'function') {
      resolver();
      setResolver(undefined);
      setRemainingChars(initialState);
    }
  }, [remainingChars]);

  const setText = text =>
    new Promise(resolve => {
      setResolver(() => resolve);
      setChars(initialState);
      /* istanbul ignore else */
      if (typeof text === 'string') {
        setRemainingChars(text);
      } else {
        resolve();
      }
    });

  const clearText = action =>
    new Promise(resolve =>
      /* istanbul ignore next */
      !chars
        ? resolve(action)
        : getTimers(charsRef.current.split(''), () => {
            /* istanbul ignore next */
            backspace(charsRef.current, setChars);
            /* istanbul ignore next */
            return charsRef.current.length === 0 && resolve(action);
          }),
    );

  const text = chars;

  return [text, setText, clearText];
}
