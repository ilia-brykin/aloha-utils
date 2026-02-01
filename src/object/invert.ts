/**
 * Creates an object composed of the inverted keys and values of object.
 *
 * @param {Object} object - The object to invert.
 * @return {Object} Returns the new inverted object.
 *
 * @example
 * invert({ a: 1, b: 2, c: 1 }); // { "1": "c", "2": "b" }
 */
export const invert = (object: unknown): Record<string, string> => {
  const target = Object(object) as Record<string, unknown>;
  const result: Record<string, string> = {};
  const keys = Object.keys(target);

  for (const key of keys) {
    result[String(target[key])] = key;
  }

  return result;
};
