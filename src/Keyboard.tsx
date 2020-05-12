import { useEffect, useState } from 'react';
import getTimer from './getTimer';
import useKeyboard from './useKeyboard';
import { defaultKeyPressDelay, defaultSentenceDelay } from './constants';

const initialState: string[] = [];

export const type = (...actions: (string | number)[]) => [...actions];

interface Props {
  children:
    | string
    | number
    | (({ type }: { type: (...arg: (string | number)[]) => (string | number)[] }) => any);
  keyPressDelayRange?: number[];
  sentenceDelayPerCharRange?: number[];
}

export default function Keyboard({
  children,
  sentenceDelayPerCharRange = defaultSentenceDelay,
  keyPressDelayRange = defaultKeyPressDelay,
}: Props) {
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

      getTimer(previousAction, sentenceDelayPerCharRange).then(
        /* istanbul ignore next */
        () =>
          clearText(newAction).then((action: string | number) =>
            setText(action, keyPressDelayRange).then(() =>
              setRemainingActions(newRemainingActions),
            ),
          ),
      );
      setPreviousAction(newAction);
    }
  }, [remainingActions]);

  return text;
}
