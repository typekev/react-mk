/**
 * Returns a number between `min` and `max`.
 *
 * @param min - The smallest possible output
 * @param max - The largest possible output
 * @returns A number in the range of `min` and `max`
 */
const getKeyPressDelay = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

export default getKeyPressDelay;
