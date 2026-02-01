import {
  isArray,
  toInteger,
} from "../lang";
import {
  resolveDropPredicate,
  type DropPredicate,
} from "./_dropWhileHelpers.js";

/**
 * Finds the index of the last element predicate returns truthy for.
 *
 * @param {Array} array - The array to inspect.
 * @param {Function} [predicate] - The predicate invoked per iteration.
 * @param {number} [fromIndex=array.length-1] - The index to search from.
 * @return {number} The index of the found element, else -1.
 *
 * @example
 * findLastIndex([1, 2, 3], value => value === 2); // 1
 */
export const findLastIndex = <T>(
  array: T[],
  predicate?: DropPredicate,
  fromIndex?: unknown,
): number => {
  if (!isArray(array)) {
    return -1;
  }

  const length = array.length;
  if (length === 0) {
    return -1;
  }

  let startIndex = fromIndex === undefined
    ? length - 1
    : toInteger(fromIndex);

  if (startIndex < 0) {
    startIndex = length + startIndex;
  }

  if (startIndex >= length) {
    startIndex = length - 1;
  }

  const test = resolveDropPredicate(predicate);
  for (let index = startIndex; index >= 0; index -= 1) {
    if (test(array[index], index, array)) {
      return index;
    }
  }

  return -1;
};
