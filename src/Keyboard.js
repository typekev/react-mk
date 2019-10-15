import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getTimer from './getTimer';
import useKeyboard from './useKeyboard';
import { defaultKeyPressDelay, defaultSentenceDelay } from './constants';

const initialState = [];

export const type = (...actions) => [...actions];

export default function Keyboard({ children, sentenceDelayPerCharRange, keyPressDelayRange }) {
  const [text, setText, clearText] = useKeyboard();
  const [remainingActions, setRemainingActions] = useState(initialState);
  const [previousAction, setPreviousAction] = useState('');

  useEffect(
    /* istanbul ignore next */
    () => {
      if (remainingActions.length === initialState.length) {
        setRemainingActions(
          typeof children === 'function' ? children({ type }) : [children.toString()],
        );
      }
    },
    [children],
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
      getTimer(previousAction, sentenceDelayPerCharRange).then(doClear);
      setPreviousAction(newAction);
    }
  }, [remainingActions]);

  return text;
}

Keyboard.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]).isRequired,
  keyPressDelayRange: PropTypes.arrayOf(PropTypes.number),
  sentenceDelayPerCharRange: PropTypes.arrayOf(PropTypes.number),
};

Keyboard.defaultProps = {
  keyPressDelayRange: defaultKeyPressDelay,
  sentenceDelayPerCharRange: defaultSentenceDelay,
};
