import getKeyPressDelay from './getKeyPressDelay';
import { defaultKeyPressDelay } from './constants';

/**
 * Return a delay in milliseconds based on a given `action` and `delayRange`
 *
 * @param {number|string} action A delay as a number or a string used to calculate a delay
 * @param {number[]} delayRange An array of two numbers forming a range [min, max]
 * @returns {number}
 */

const getDelay = (action, delayRange = defaultKeyPressDelay) =>
  typeof action === 'number' ? action : action.length * getKeyPressDelay(...delayRange);

export default getDelay;
