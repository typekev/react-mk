import { Action, Range } from "../types";
import getTimer from './getTimer';
import getDelay from './getDelay';

export const getPreviousDelay = (delays: number[], index: number) => index && delays[index - 1];

export const accumulateDelays = (
  accumulatedDelays: number[],
  action: Action,
  index: number,
  delayRange?: Range,
) => [
    ...accumulatedDelays,
    getDelay(action, delayRange) + getPreviousDelay(accumulatedDelays, index),
  ];

export const getDelays = (actions: Action[], delayRange?: Range) =>
  actions.reduce<number[]>(
    (accumulatedDelays, action, index) =>
      accumulateDelays(accumulatedDelays, action, index, delayRange),
    [],
  );

export const startTimers = (actions: Action[], then: () => void) => (
  delay: number,
  index: number,
) => getTimer(actions[index], [delay, delay]).then(then);

const getTimers = (actions: Action[], then: () => void, delayRange?: Range) => {
  const delays = getDelays(actions, delayRange);
  delays.forEach(startTimers(actions, then));
};

export default getTimers;
