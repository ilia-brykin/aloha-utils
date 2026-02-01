import {
  isArray,
} from "../lang";
import {
  set,
} from "../object";

/**
 * This method is like zipObject except that it supports property paths.
 *
 * @param {Array} [props=[]] - The property identifiers.
 * @param {Array} [values=[]] - The property values.
 * @return {Object} The new object.
 *
 * @example
 * zipObjectDeep(["a.b[0].c", "a.b[1].d"], [1, 2]);
 * // { a: { b: [{ c: 1 }, { d: 2 }] } }
 */
export const zipObjectDeep = (
  props: Array<string | Array<string | number>> = [],
  values: unknown[] = [],
): Record<string, unknown> => {
  if (!isArray(props)) {
    return {};
  }

  const result: Record<string, unknown> = {};
  for (let index = 0; index < props.length; index += 1) {
    set(result, props[index], values[index]);
  }

  return result;
};
