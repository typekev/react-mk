import getTimer from './getTimer';
import getDelay from './getDelay';

export const getPreviousDelay = (delays: number[], index: number) =>
  index === 0 ? 0 : delays[index - 1];

export const accumulateDelays = (
  accumulatedDelays: number[],
  action: number,
  index: number,
  delayRange: [number, number],
) => [
  ...accumulatedDelays,
  getDelay(action, delayRange) + getPreviousDelay(accumulatedDelays, index),
];
export const getDelays = (actions: number[], delayRange: [number, number]) =>
  actions.reduce(
    (accumulatedDelays: number[], action, index) =>
      accumulateDelays(accumulatedDelays, action, index, delayRange),
    [],
  );
export const startTimers = (actions: number[], then: () => Promise<void>) => (
  delay: number,
  index: number,
) => getTimer(actions[index], [delay, delay]).then(then);
const getTimers = (actions: number[], then: () => Promise<void>, delayRange: [number, number]) => {
  const delays = getDelays(actions, delayRange);
  delays.forEach(startTimers(actions, then));
};
export default getTimers;
