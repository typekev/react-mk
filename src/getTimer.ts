import { Action, Range } from './types';
import getDelay from './getDelay';

interface Props {
  action: Action;
  timer: number;
}

export const clearTimer = ({ action, timer }: Props) => {
  window.clearTimeout(timer);
  return action;
};

export const getTimeout = (resolve: (params: Props) => void, action: Action, delay: number) => {
  const timer = window.setTimeout(() => resolve({ action, timer }), delay);
  return timer;
};

export const createTimer = (action: Action, delayRange?: Range) => (resolve: (params: Props) => void) => {
  const delay = getDelay(action, delayRange);
  const timer = getTimeout(resolve, action, delay);
  return { timer, delay };
};

const getTimer = (action: Action, delayRange?: Range) =>
  new Promise<Props>(createTimer(action, delayRange)).then(clearTimer);

export default getTimer;
