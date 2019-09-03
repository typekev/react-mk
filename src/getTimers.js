import getDelay from './getDelay';

export const delayPerChar = 72;

export const doSetAction = (action, setText) => () => setText(action);

const getTimers = (actions, setText) =>
  actions.reduce((accumulatedActions, action) => {
    const delay =
      typeof action === 'number'
        ? action
        : action.length * delayPerChar + getDelay(accumulatedActions);
    return [
      ...accumulatedActions,
      [typeof action === 'string' && setTimeout(doSetAction(action, setText), delay), delay],
    ];
  }, []);

export default getTimers;
