import {
  toInteger,
} from "../lang";

/**
 * Creates a function that invokes func with arguments arranged according to the specified indexes.
 *
 * @param {Function} func - The function to rearrange arguments for.
 * @param {...(number|number[])} indexes - The arranged argument indexes.
 * @return {Function} The new function.
 *
 * @example
 * const rearged = rearg((a, b, c) => [a, b, c], [2, 0, 1]);
 */
export const rearg = (
  func: (...args: unknown[]) => unknown,
  ...indexes: Array<number | number[]>
): (...args: unknown[]) => unknown => {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  const order: number[] = [];
  for (const index of indexes) {
    if (Array.isArray(index)) {
      for (const inner of index) {
        order.push(toInteger(inner));
      }
    } else {
      order.push(toInteger(index));
    }
  }

  return function(this: unknown, ...args: unknown[]) {
    const reordered = order.map(position => args[position]);
    return func.apply(this, reordered);
  };
};
