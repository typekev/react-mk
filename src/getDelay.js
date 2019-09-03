export const addActionDelay = (accumulatedDelay, action) => accumulatedDelay + action[1];

const getDelay = accumulatedActions => accumulatedActions.reduce(addActionDelay, 0);

export default getDelay;
