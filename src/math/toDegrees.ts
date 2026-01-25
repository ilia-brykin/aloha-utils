/**
 * Converts radians to degrees.
 *
 * @param {*} radians - The angle in radians.
 * @return {number|undefined} The angle in degrees or undefined.
 *
 * @example
 * toDegrees(Math.PI); // 180
 * toDegrees(0); // 0
 */
export const toDegrees = (radians: unknown): number | undefined => {
  if (typeof radians !== "number" || Number.isNaN(radians)) {
    return undefined;
  }

  return radians * (180 / Math.PI);
};
