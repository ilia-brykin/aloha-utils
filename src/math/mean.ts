/**
 * Returns the mean (average) of numeric values from arguments or from the first array argument.
 *
 * @param {*} values - Values to average, or a single array as the first argument.
 * @return {number|undefined} The mean of numbers or undefined.
 *
 * @example
 * mean(1, 2, 3); // 2
 * mean([1, 2, 3]); // 2
 */
export const mean = (...values: unknown[]): number | undefined => {
  if (values.length === 0) {
    return undefined;
  }

  const source: unknown[] = Array.isArray(values[0]) ? values[0] : values;
  if (source.length === 0) {
    return undefined;
  }

  let total = 0;
  let count = 0;

  for (const value of source) {
    if (typeof value !== "number" || Number.isNaN(value)) {
      continue;
    }

    total += value;
    count += 1;
  }

  return count > 0 ? total / count : undefined;
};
