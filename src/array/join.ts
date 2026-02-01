import {
  isArray,
} from "../lang";

/**
 * Converts all elements in array into a string separated by separator.
 *
 * @param {Array} array - The array to convert.
 * @param {string} [separator=","] - The element separator.
 * @return {string} The joined string.
 *
 * @example
 * join(["a", "b", "c"], "~"); // "a~b~c"
 */
export const join = <T>(array: T[], separator: string = ","): string => {
  if (!isArray(array)) {
    return "";
  }

  return array.join(separator);
};
