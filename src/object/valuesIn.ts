import {
  keysIn,
} from "./keysIn.js";

/**
 * Creates an array of the own and inherited enumerable string keyed property values of object.
 *
 * @param {Object} object - The object to query.
 * @return {Array} Returns the array of property values.
 *
 * @example
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 * valuesIn(new Foo()); // [1, 2, 3]
 */
export const valuesIn = (object: unknown): unknown[] => {
  const allKeys = keysIn(object);
  const target = Object(object) as Record<string, unknown>;
  return allKeys.map(key => target[key]);
};
