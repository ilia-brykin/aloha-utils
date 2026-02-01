import {
  isObject,
} from "../lang";

type TransformIteratee = (
  accumulator: unknown,
  value: unknown,
  key: string | number,
  object: unknown,
) => unknown;

const identity = (value: unknown): unknown => value;

/**
 * An alternative to reduce; transforms object to a new accumulator object.
 *
 * @param {Object} object - The object to iterate over.
 * @param {Function} [iteratee] - The function invoked per iteration.
 * @param {*} [accumulator] - The custom accumulator value.
 * @return {*} Returns the accumulated value.
 *
 * @example
 * transform([2, 3, 4], (result, n) => {
 *   result.push(n * n);
 *   return n % 2 === 0;
 * }, []);
 * // => [4, 9]
 */
export const transform = (
  object: unknown,
  iteratee?: TransformIteratee,
  accumulator?: unknown,
): unknown => {
  const source = Object(object) as Record<string, unknown>;
  const cb = typeof iteratee === "function" ? iteratee : identity;

  let result = accumulator;
  if (result === undefined) {
    if (Array.isArray(object)) {
      result = [];
    } else if (isObject(object)) {
      result = Object.create(Object.getPrototypeOf(object));
    } else {
      result = {};
    }
  }

  if (Array.isArray(object)) {
    const array = object as unknown[];
    for (let i = 0; i < array.length; i += 1) {
      if (cb(result, array[i], i, object) === false) {
        break;
      }
    }
    return result;
  }

  const keys = Object.keys(source);
  for (const key of keys) {
    if (cb(result, source[key], key, object) === false) {
      break;
    }
  }

  return result;
};
