/**
 * The inverse of toPairs; this method returns an object composed from key-value pairs.
 *
 * @param {Array} pairs - The key-value pairs.
 * @return {Object} The new object.
 *
 * @example
 * fromPairs([["a", 1], ["b", 2]]); // { a: 1, b: 2 }
 */
import {
  isArray,
} from "../lang";

export const fromPairs = (
  pairs: Array<[string | number | symbol, unknown]>,
): Record<string | number | symbol, unknown> => {
  if (!isArray(pairs)) {
    return {};
  }

  const result: Record<string | number | symbol, unknown> = {};
  for (const pair of pairs) {
    if (!isArray(pair) || pair.length < 2) {
      continue;
    }
    const [key, value] = pair;
    result[key] = value;
  }

  return result;
};
