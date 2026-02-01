type CacheLike = {
  clear?: () => void;
  delete: (key: unknown) => boolean;
  get: (key: unknown) => unknown;
  has: (key: unknown) => boolean;
  set: (key: unknown, value: unknown) => unknown;
};

/**
 * Creates a function that memoizes the result of func.
 *
 * @param {Function} func - The function to have its output memoized.
 * @param {Function} [resolver] - The function to resolve the cache key.
 * @return {Function} The new memoized function.
 *
 * @example
 * const values = memoize(obj => Object.values(obj));
 */
export const memoize = (
  func: (...args: unknown[]) => unknown,
  resolver?: (...args: unknown[]) => unknown,
): ((...args: unknown[]) => unknown) & { cache: CacheLike } => {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  const Cache = (memoize as unknown as { Cache?: new () => CacheLike }).Cache ?? Map;
  const cache = new Cache();

  const memoized = function (this: unknown, ...args: unknown[]) {
    const key = resolver ? resolver.apply(this, args) : args[0];
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  } as ((...args: unknown[]) => unknown) & { cache: CacheLike };

  memoized.cache = cache;
  return memoized;
};

memoize.Cache = Map;
