import {
  isArray,
  isObject,
  isPlainObject,
} from "../lang";

type Customizer = (
  objValue: unknown,
  srcValue: unknown,
  key: string,
  object: Record<string, unknown>,
  source: Record<string, unknown>,
  stack?: unknown,
) => unknown;

const isMergeable = (value: unknown): value is Record<string, unknown> | unknown[] => (
  isPlainObject(value) || isArray(value)
);

const mergeInto = (
  target: Record<string, unknown>,
  source: Record<string, unknown>,
  customizer?: Customizer,
): void => {
  for (const key in source) {
    const srcValue = source[key];
    const objValue = target[key];

    if (customizer) {
      const customized = customizer(objValue, srcValue, key, target, source, undefined);
      if (customized !== undefined) {
        target[key] = customized;
        continue;
      }
    }

    if (srcValue === undefined && objValue !== undefined) {
      continue;
    }

    if (isMergeable(objValue) && isMergeable(srcValue)) {
      if (isArray(objValue) && isArray(srcValue)) {
        for (let i = 0; i < srcValue.length; i += 1) {
          const srcItem = srcValue[i];
          const objItem = objValue[i];
          if (isMergeable(objItem) && isMergeable(srcItem)) {
            mergeInto(objItem as Record<string, unknown>, srcItem as Record<string, unknown>, customizer);
          } else if (!(srcItem === undefined && objItem !== undefined)) {
            (objValue as unknown[])[i] = srcItem;
          }
        }
      } else {
        mergeInto(objValue as Record<string, unknown>, srcValue as Record<string, unknown>, customizer);
      }
      continue;
    }

    if (isMergeable(srcValue)) {
      const next = isArray(srcValue) ? [] : {};
      target[key] = next;
      mergeInto(next as Record<string, unknown>, srcValue as Record<string, unknown>, customizer);
    } else {
      target[key] = srcValue;
    }
  }
};

/**
 * Recursively merges own and inherited enumerable string keyed properties of source
 * objects into the destination object.
 *
 * @param {Object} object - The destination object.
 * @param {...Object} [sources] - The source objects.
 * @return {Object} Returns object.
 *
 * @example
 * const object = { a: [{ b: 2 }, { d: 4 }] };
 * const other = { a: [{ c: 3 }, { e: 5 }] };
 * merge(object, other); // { a: [{ b: 2, c: 3 }, { d: 4, e: 5 }] }
 */
export const merge = (
  object: unknown,
  ...sources: unknown[]
): Record<string, unknown> => {
  const target = Object(object) as Record<string, unknown>;

  for (const source of sources) {
    if (!isObject(source)) {
      continue;
    }
    mergeInto(target, source as Record<string, unknown>);
  }

  return target;
};

export const mergeBase = (
  object: unknown,
  sources: unknown[],
  customizer?: Customizer,
): Record<string, unknown> => {
  const target = Object(object) as Record<string, unknown>;

  for (const source of sources) {
    if (!isObject(source)) {
      continue;
    }
    mergeInto(target, source as Record<string, unknown>, customizer);
  }

  return target;
};
