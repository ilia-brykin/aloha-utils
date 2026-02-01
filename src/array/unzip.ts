import {
  isArray,
} from "../lang";

/**
 * This method is like zip except that it accepts an array of grouped elements
 * and creates an array regrouping the elements to their pre-zip configuration.
 *
 * @param {Array} array - The array of grouped elements to process.
 * @return {Array} The new array of regrouped elements.
 *
 * @example
 * unzip([["a", 1], ["b", 2]]); // [["a", "b"], [1, 2]]
 */
export const unzip = <T>(array: T[][]): T[][] => {
  if (!isArray(array)) {
    return [];
  }

  if (array.length === 0) {
    return [];
  }

  let maxLength = 0;
  for (const group of array) {
    if (isArray(group)) {
      maxLength = Math.max(maxLength, group.length);
    }
  }

  if (maxLength === 0) {
    return [];
  }

  const result: T[][] = [];
  for (let index = 0; index < maxLength; index += 1) {
    const group: T[] = [];
    for (const value of array) {
      if (isArray(value)) {
        group.push(value[index]);
      } else {
        group.push(undefined as T);
      }
    }
    result.push(group);
  }

  return result;
};
