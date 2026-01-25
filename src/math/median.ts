/**
 * Returns the median of numeric values from an array.
 *
 * @param {*} values - Values to compare, or a single array as the first argument.
 * @return {number|undefined} The median or undefined.
 *
 * @example
 * median(1, 3, 2); // 2
 * median([1, 3, 2]); // 2
 * median([1, 2, 3, 4]); // 2.5
 */
export const median = (...values: unknown[]): number | undefined => {
  if (values.length === 0) {
    return undefined;
  }

  const source: unknown[] = Array.isArray(values[0]) ? values[0] : values;
  if (source.length === 0) {
    return undefined;
  }

  const numbers = source.filter((value): value is number => {
    return typeof value === "number" && !Number.isNaN(value);
  });

  if (numbers.length === 0) {
    return undefined;
  }

  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 1) {
    return sorted[mid];
  }

  return (sorted[mid - 1] + sorted[mid]) / 2;
};
