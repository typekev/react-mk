import type { ReactNode } from 'react';
import type { Action, ActionBuilders, TypewriterProps } from './types';
import { type as typeAction, pause, deleteAll, deleteChars } from './actions';
import { useTypewriter } from './useTypewriter';
import { DEFAULT_SENTENCE_DELAY } from './constants';

const builders: ActionBuilders = { type: typeAction, pause, deleteAll, deleteChars };

export default function Typewriter({
  children,
  sentences,
  sentenceDelay = DEFAULT_SENTENCE_DELAY,
  typeSpeed,
  deleteSpeed,
  loop = false,
  loopDelay,
  startDelay,
  mistakeChance,
  onType,
  onDelete,
  onFinish,
  onLoop,
}: TypewriterProps): ReactNode {
  let actions: Action[];

  if (sentences && sentences.length > 0) {
    actions = sentences.flatMap((sentence, i) => {
      const result: Action[] = [typeAction(sentence)];
      if (i < sentences.length - 1 || loop) {
        result.push(pause(sentenceDelay), deleteAll());
      }
      return result;
    });
  } else if (typeof children === 'function') {
    actions = children(builders);
  } else if (children != null) {
    actions = [typeAction(String(children))];
  } else {
    actions = [];
  }

  const { text } = useTypewriter(actions, {
    typeSpeed,
    deleteSpeed,
    loop,
    loopDelay,
    startDelay,
    mistakeChance,
    onType,
    onDelete,
    onFinish,
    onLoop,
  });

  return text;
}
