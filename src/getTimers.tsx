import getTimer from "./getTimer";
import getDelay from "./getDelay";
export const getPreviousDelay = (delays, index) =>
  index === 0 ? 0 : delays[index - 1];
export const accumulateDelays = (
  accumulatedDelays,
  action,
  index,
  delayRange
) => [
  ...accumulatedDelays,
  getDelay(action, delayRange) + getPreviousDelay(accumulatedDelays, index)
];
export const getDelays = (actions, delayRange) =>
  actions.reduce(
    (accumulatedDelays, action, index) =>
      accumulateDelays(accumulatedDelays, action, index, delayRange),
    []
  );
export const startTimers = (actions, then) => (delay, index) =>
  getTimer(actions[index], [delay, delay]).then(then);
const getTimers = (actions, then, delayRange) => {
  const delays = getDelays(actions, delayRange);
  delays.forEach(startTimers(actions, then));
};
export default getTimers;
