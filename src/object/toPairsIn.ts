import {
  isMap,
  isSet,
} from "../lang";

/**
 * Creates an array of own and inherited enumerable string keyed-value pairs for object.
 * If object is a map or set, its entries are returned.
 *
 * @param {Object} object - The object to query.
 * @return {Array} Returns the key-value pairs.
 *
 * @example
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * Foo.prototype.b = 2;
 * toPairsIn(new Foo()); // [["a", 1], ["b", 2]]
 */
export const toPairsIn = (object: unknown): Array<[unknown, unknown]> => {
  if (isMap(object)) {
    return Array.from((object as Map<unknown, unknown>).entries());
  }

  if (isSet(object)) {
    return Array.from((object as Set<unknown>).entries());
  }

  const target = Object(object) as Record<string, unknown>;
  const result: Array<[unknown, unknown]> = [];
  for (const key in target) {
    result.push([key, target[key]]);
  }
  return result;
};
