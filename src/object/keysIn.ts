import {
  isObject,
} from "../lang";

/**
 * Creates an array of the own and inherited enumerable property names of object.
 *
 * @param {Object} object - The object to query.
 * @return {Array} Returns the array of property names.
 *
 * @example
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 * keysIn(new Foo()); // ["a", "b", "c"]
 */
export const keysIn = (object: unknown): string[] => {
  if (object === null || object === undefined) {
    return [];
  }

  const target = Object(object);
  const result: string[] = [];

  if (!isObject(object) && typeof object !== "string") {
    return Object.keys(target);
  }

  for (const key in target) {
    result.push(key);
  }

  return result;
};
