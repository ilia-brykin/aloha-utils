/**
 * Returns the sum of absolute numeric values from arguments or from the first array argument.
 *
 * @param {*} values - Values to sum, or a single array as the first argument.
 * @return {number|undefined} The sum of absolute values or undefined.
 *
 * @example
 * sumAbs(1, -2, 3); // 6
 * sumAbs([1, -2, 3]); // 6
 */
export const sumAbs = (...values: unknown[]): number | undefined => {
  if (values.length === 0) {
    return undefined;
  }

  const source: unknown[] = Array.isArray(values[0]) ? values[0] : values;
  if (source.length === 0) {
    return undefined;
  }

  let total = 0;
  let hasNumber = false;

  for (const value of source) {
    if (typeof value !== "number" || Number.isNaN(value)) {
      continue;
    }

    total += Math.abs(value);
    hasNumber = true;
  }

  return hasNumber ? total : undefined;
};
