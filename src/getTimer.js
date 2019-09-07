import getDelay from './getDelay';

export const clearTimer = ({ action, timer }) => {
  clearTimeout(timer);
  return action;
};

export const getTimeout = (resolve, action, delay) => {
  const timer = setTimeout(
    /* istanbul ignore next */
    () => resolve({ action, timer }),
    delay,
  );
  return timer;
};

export const createTimer = (action, delayRange) => resolve => {
  const delay = getDelay(action, delayRange);
  const timer = getTimeout(resolve, action, delay);
  return { timer, delay };
};

const getTimer = (action, delayRange) =>
  new Promise(createTimer(action, delayRange)).then(clearTimer);

export default getTimer;
