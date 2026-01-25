/**
 * Returns the maximum numeric value from arguments or from the first array argument.
 *
 * @param {*} values - Values to compare, or a single array as the first argument.
 * @return {number|undefined} The maximum number or undefined.
 *
 * @example
 * max(1, 3, 2); // 3
 * max([1, 3, 2]); // 3
 */
export const max = (...values: unknown[]): number | undefined => {
  if (values.length === 0) {
    return undefined;
  }

  const source: unknown[] = Array.isArray(values[0]) ? values[0] : values;
  if (source.length === 0) {
    return undefined;
  }

  let result: number | undefined;
  for (const value of source) {
    if (typeof value !== "number" || Number.isNaN(value)) {
      continue;
    }

    if (result === undefined || value > result) {
      result = value;
    }
  }

  return result;
};
