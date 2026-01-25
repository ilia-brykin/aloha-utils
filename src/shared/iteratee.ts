export const getByPath = (value: unknown, path: string | Array<string | number>): unknown => {
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

export const resolveIteratee = <T>(
  iteratee: ((value: T) => unknown) | string | Array<string | number>,
): ((value: T) => unknown) => {
  if (typeof iteratee === "function") {
    return iteratee;
  }

  return (value: T) => getByPath(value, iteratee);
};
