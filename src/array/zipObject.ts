import {
  isArray,
} from "../lang";

/**
 * This method is like fromPairs except that it accepts two arrays, one of
 * property identifiers and one of corresponding values.
 *
 * @param {Array} [props=[]] - The property identifiers.
 * @param {Array} [values=[]] - The property values.
 * @return {Object} The new object.
 *
 * @example
 * zipObject(["a", "b"], [1, 2]); // { a: 1, b: 2 }
 */
export const zipObject = (
  props: Array<string | number | symbol> = [],
  values: unknown[] = [],
): Record<string | number | symbol, unknown> => {
  if (!isArray(props)) {
    return {};
  }

  const result: Record<string | number | symbol, unknown> = {};
  for (let index = 0; index < props.length; index += 1) {
    result[props[index]] = values[index];
  }

  return result;
};
