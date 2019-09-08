import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getTimer from './getTimer';
import useKeyboard from './useKeyboard';
import { defaultKeyPressDelay } from './constants';
import './cursor.module.css';

const initialState = [];

export const type = (...actions) => [...actions];

export default function Keyboard({
  children,
  cursor,
  cursorProps: { blink },
  sentenceDelayRange,
  keyPressDelayRange,
}) {
  const [text, setText, clearText] = useKeyboard();
  const [remainingActions, setRemainingActions] = useState(initialState);

  useEffect(
    /* istanbul ignore next */
    () => {
      if (remainingActions.length === initialState.length) {
        setRemainingActions(
          typeof children === 'function' ? children({ type }) : [children.toString()],
        );
      }
    },
    [children, cursor],
  );

  useEffect(() => {
    if (remainingActions.length > initialState.length) {
      const [newAction, ...newRemainingActions] = remainingActions;

      const doAction =
        /* istanbul ignore next */
        action =>
          setText(action, keyPressDelayRange).then(
            /* istanbul ignore next */
            () => setRemainingActions(newRemainingActions),
          );
      const doClear =
        /* istanbul ignore next */
        action => clearText(action).then(doAction);
      getTimer(newAction, sentenceDelayRange).then(doClear);
    }
  }, [remainingActions]);

  return (
    <>
      {text}
      <span styleName={blink ? 'cursor' : ''}>{cursor}</span>
    </>
  );
}

Keyboard.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]).isRequired,
  cursor: PropTypes.node,
  keyPressDelayRange: PropTypes.arrayOf(PropTypes.number),
  sentenceDelayRange: PropTypes.arrayOf(PropTypes.number),
  cursorProps: PropTypes.shape({ blink: PropTypes.bool }),
};

Keyboard.defaultProps = {
  cursor: '|',
  keyPressDelayRange: defaultKeyPressDelay,
  sentenceDelayRange: defaultKeyPressDelay.map(delay => delay * 1.25),
  cursorProps: { blink: true },
};
