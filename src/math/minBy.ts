const getByPath = (value: unknown, path: string | Array<string | number>): unknown => {
  const parts = Array.isArray(path) ? path : path.split(".");
  let current: unknown = value;

  for (const key of parts) {
    if (current === null || current === undefined) {
      return undefined;
    }

    const obj = current as Record<string | number, unknown>;
    current = obj[key];
  }

  return current;
};

/**
 * Returns the element with the minimum numeric iteratee value.
 *
 * @param {Array} array - The array to inspect.
 * @param {Function|string|Array} iteratee - The iteratee function or property path.
 * @return {*} The element with the minimum numeric iteratee value or undefined.
 *
 * @example
 * minBy([{ n: 1 }, { n: 2 }], o => o.n); // { n: 1 }
 * minBy([{ n: 1 }, { n: 2 }], "n"); // { n: 1 }
 */
export const minBy = <T>(
  array: T[],
  iteratee: ((value: T) => unknown) | string | Array<string | number>,
): T | undefined => {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }

  const getValue =
    typeof iteratee === "function"
      ? iteratee
      : (value: T) => getByPath(value, iteratee);

  let result: T | undefined;
  let resultValue: number | undefined;

  for (const item of array) {
    const value = getValue(item);
    if (typeof value !== "number" || Number.isNaN(value)) {
      continue;
    }

    if (resultValue === undefined || value < resultValue) {
      resultValue = value;
      result = item;
    }
  }

  return result;
};
