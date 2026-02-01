import {
  isArray,
  toInteger,
} from "../lang";
import {
  resolveDropPredicate,
  type DropPredicate,
} from "./_dropWhileHelpers.js";

/**
 * Finds the index of the first element predicate returns truthy for.
 *
 * @param {Array} array - The array to inspect.
 * @param {Function} [predicate] - The predicate invoked per iteration.
 * @param {number} [fromIndex=0] - The index to search from.
 * @return {number} The index of the found element, else -1.
 *
 * @example
 * findIndex([1, 2, 3], value => value === 2); // 1
 */
export const findIndex = <T>(
  array: T[],
  predicate?: DropPredicate,
  fromIndex: unknown = 0,
): number => {
  if (!isArray(array)) {
    return -1;
  }

  const length = array.length;
  if (length === 0) {
    return -1;
  }

  let startIndex = toInteger(fromIndex);
  if (startIndex < 0) {
    startIndex = Math.max(length + startIndex, 0);
  }

  const test = resolveDropPredicate(predicate);
  for (let index = startIndex; index < length; index += 1) {
    if (test(array[index], index, array)) {
      return index;
    }
  }

  return -1;
};
