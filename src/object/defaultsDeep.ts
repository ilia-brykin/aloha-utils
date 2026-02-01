import {
  isArray,
  isObject,
  isPlainObject,
} from "../lang";

const isMergeable = (value: unknown): value is Record<string, unknown> | unknown[] => (
  isPlainObject(value) || isArray(value)
);

const mergeDefaults = (
  target: Record<string, unknown>,
  source: Record<string, unknown>,
): void => {
  for (const key in source) {
    const srcValue = source[key];
    const objValue = target[key];

    if (objValue === undefined) {
      if (isMergeable(srcValue)) {
        const container = isArray(srcValue) ? [] : {};
        target[key] = container;
        mergeDefaults(container as Record<string, unknown>, srcValue as Record<string, unknown>);
      } else {
        target[key] = srcValue;
      }
      continue;
    }

    if (isMergeable(objValue) && isMergeable(srcValue)) {
      mergeDefaults(objValue as Record<string, unknown>, srcValue as Record<string, unknown>);
    }
  }
};

/**
 * This method is like defaults except that it recursively assigns default properties.
 *
 * @param {Object} object - The destination object.
 * @param {...Object} [sources] - The source objects.
 * @return {Object} Returns object.
 *
 * @example
 * defaultsDeep({ a: { b: 2 } }, { a: { b: 1, c: 3 } });
 * // => { a: { b: 2, c: 3 } }
 */
export const defaultsDeep = (
  object: unknown,
  ...sources: unknown[]
): Record<string, unknown> => {
  const target = Object(object) as Record<string, unknown>;

  for (const source of sources) {
    if (!isObject(source)) {
      continue;
    }
    mergeDefaults(target, source as Record<string, unknown>);
  }

  return target;
};
