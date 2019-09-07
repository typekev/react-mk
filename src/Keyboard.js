import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getTimer from './getTimer';
import useKeyboard from './useKeyboard';
import styles from './cursor.module.css';
import { defaultKeyPressDelay } from './constants';

const initialState = [];

export const type = (...actions) => [...actions];

export default function Keyboard({ children, cursor, actionDelay }) {
  const [text, setText, clearText] = useKeyboard();
  const [remainingActions, setRemainingActions] = useState(initialState);

  useEffect(
    /* istanbul ignore next */
    () => {
      if (remainingActions.length === initialState.length) {
        if (typeof children === 'function') {
          setRemainingActions(children({ type }));
        } else {
          clearText().then(() => setText(children.toString()));
        }
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
          setText(action).then(
            /* istanbul ignore next */
            () => setRemainingActions(newRemainingActions),
          );
      const doClear =
        /* istanbul ignore next */
        action => clearText(action).then(doAction);
      getTimer(newAction, actionDelay).then(doClear);
    }
  }, [remainingActions]);

  return (
    <>
      {text}
      <span className={styles.cursor}>{cursor}</span>
    </>
  );
}

Keyboard.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]).isRequired,
  cursor: PropTypes.node,
  actionDelay: PropTypes.arrayOf(PropTypes.number),
};

Keyboard.defaultProps = {
  cursor: '|',
  actionDelay: defaultKeyPressDelay.map(delay => delay * 1.25),
};
