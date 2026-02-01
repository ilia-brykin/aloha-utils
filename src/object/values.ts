import {
  keys,
} from "./keys.js";

/**
 * Creates an array of the own enumerable string keyed property values of object.
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
 * values(new Foo()); // [1, 2]
 */
export const values = (object: unknown): unknown[] => {
  const ownKeys = keys(object);
  const target = Object(object) as Record<string, unknown>;
  return ownKeys.map(key => target[key]);
};
