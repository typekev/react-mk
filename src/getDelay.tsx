import { Action } from '../types';
import getKeyPressDelay from './getKeyPressDelay';
import { defaultKeyPressDelay } from './constants';

/**
 * Returns a delay in milliseconds based on a given `action` and `delayRange`
 *
 * @param action - The smallest possible output
 * @param delayRange - The largest possible output
 * @returns A millisecond delay
 */
const getDelay = (action: Action, delayRange = defaultKeyPressDelay) =>
  typeof action === 'number' ? action : action.length * getKeyPressDelay(...delayRange);

export default getDelay;
