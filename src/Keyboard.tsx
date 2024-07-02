import React, { useEffect, useState } from 'react';
import { Action, Range } from './types';
import getTimer from './getTimer';
import useKeyboard from './useKeyboard';
import { defaultKeyPressDelay, defaultSentenceDelay } from './constants';

export const type = (...actions: Action[]) => [...actions];

interface Props {
  children: string | number | ((params: { type: (...arg: Action[]) => Action[] }) => Action[]);
  keyPressDelayRange?: Range;
  sentenceDelayPerCharRange?: Range;
}

export default function Keyboard({
  children,
  sentenceDelayPerCharRange = defaultSentenceDelay,
  keyPressDelayRange = defaultKeyPressDelay,
}: Props): JSX.Element {
  const { text, setText, clearText } = useKeyboard();
  const [remainingActions, setRemainingActions] = useState<Action[]>([]);
  const [previousAction, setPreviousAction] = useState<Action>('');
  const hasRemainingActions = remainingActions.length > 0;

  useEffect(() => {
    if (!hasRemainingActions) {
      setRemainingActions(typeof children === 'function' ? children({ type }) : [children.toString()]);
    }
  }, [children, hasRemainingActions]);

  useEffect(() => {
    if (hasRemainingActions) {
      const [newAction, ...newRemainingActions] = remainingActions;
      getTimer(previousAction, sentenceDelayPerCharRange).then(() => {
        clearText(newAction).then((action: Action) => {
          setText(action, keyPressDelayRange).then(() => {
            setRemainingActions(newRemainingActions);
          });
        });
      });
      setPreviousAction(newAction);
    }
  }, [
    remainingActions,
    sentenceDelayPerCharRange,
    keyPressDelayRange,
    previousAction,
    clearText,
    setText,
    hasRemainingActions,
  ]);

  return <>{text}</>;
}
