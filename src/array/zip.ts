import {
  isArray,
} from "../lang";

/**
 * Creates an array of grouped elements.
 *
 * @param {...Array} arrays - The arrays to process.
 * @return {Array} The new array of grouped elements.
 *
 * @example
 * zip(["a", "b"], [1, 2], [true, false]); // [["a", 1, true], ["b", 2, false]]
 */
export const zip = <T>(...arrays: T[][]): T[][] => {
  if (arrays.length === 0) {
    return [];
  }

  if (arrays.some(array => !isArray(array))) {
    return [];
  }

  const maxLength = Math.max(0, ...arrays.map(array => array.length));
  const result: T[][] = [];

  for (let index = 0; index < maxLength; index += 1) {
    const group: T[] = [];
    for (const array of arrays) {
      group.push(array[index]);
    }
    result.push(group);
  }

  return result;
};
