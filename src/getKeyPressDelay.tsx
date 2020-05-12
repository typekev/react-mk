/**
 * Return a random number between `min` and `max`
 *
 * @param {number} min The smallest possible value
 * @param {number} max The largest possible value
 * @returns {number}
 */
const getKeyPressDelay = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);
export default getKeyPressDelay;
