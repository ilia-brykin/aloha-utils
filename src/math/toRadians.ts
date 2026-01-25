/**
 * Converts degrees to radians.
 *
 * @param {*} degrees - The angle in degrees.
 * @return {number|undefined} The angle in radians or undefined.
 *
 * @example
 * toRadians(180); // 3.141592653589793
 * toRadians(0); // 0
 */
export const toRadians = (degrees: unknown): number | undefined => {
  if (typeof degrees !== "number" || Number.isNaN(degrees)) {
    return undefined;
  }

  return degrees * (Math.PI / 180);
};
