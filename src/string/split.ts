import {
  toInteger,
  toString,
} from "../lang";

/**
 * Splits string by separator.
 *
 * @param {string} [value=""] - The string to split.
 * @param {RegExp|string} separator - The separator pattern to split by.
 * @param {number} [limit] - The length to truncate results to.
 * @return {string[]} The array of string parts.
 *
 * @example
 * split("x-y-z", "-", 2); // ["x", "y"]
 */
export const split = (
  value?: unknown,
  separator?: RegExp | string,
  limit?: unknown,
): string[] => {
  const stringValue = toString(value);

  if (separator === undefined) {
    return [stringValue];
  }

  if (limit === undefined) {
    return stringValue.split(separator as string | RegExp);
  }

  const max = toInteger(limit);
  const normalizedLimit = max < 0 ? 0 : max;
  return stringValue.split(separator as string | RegExp, normalizedLimit);
};
