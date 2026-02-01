import {
  isMap,
  isSet,
} from "../lang";

/**
 * Creates an array of own enumerable string keyed-value pairs for object.
 * If object is a map or set, its entries are returned.
 *
 * @param {Object} object - The object to query.
 * @return {Array} Returns the key-value pairs.
 *
 * @example
 * const object = { a: 1, b: 2 };
 * toPairs(object); // [["a", 1], ["b", 2]]
 */
export const toPairs = (object: unknown): Array<[unknown, unknown]> => {
  if (isMap(object)) {
    return Array.from((object as Map<unknown, unknown>).entries());
  }

  if (isSet(object)) {
    return Array.from((object as Set<unknown>).entries());
  }

  const target = Object(object) as Record<string, unknown>;
  const keys = Object.keys(target);
  return keys.map(key => [key, target[key]]);
};
