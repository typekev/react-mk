import getKeyPressDelay from './getKeyPressDelay';
import { defaultKeyPressDelay } from './constants';

const getDelay = (action, delayRange = defaultKeyPressDelay) =>
  typeof action === 'number' ? action : action.length * getKeyPressDelay(...delayRange);

export default getDelay;
