import {
  isArrayLike,
  isObject,
} from "../lang";

export const isCollection = (value: unknown): value is ArrayLike<unknown> | Record<string, unknown> =>
  isArrayLike(value) || isObject(value);

export const forEachCollection = (
  collection: unknown,
  iteratee: (value: unknown, key: string | number, collection: unknown) => unknown,
): void => {
  if (!isCollection(collection)) {
    return;
  }

  if (isArrayLike(collection)) {
    const source = collection as ArrayLike<unknown>;
    for (let index = 0; index < source.length; index += 1) {
      iteratee(source[index], index, collection);
    }
    return;
  }

  const source = collection as Record<string, unknown>;
  for (const key of Object.keys(source)) {
    iteratee(source[key], key, collection);
  }
};

export const forEachCollectionRight = (
  collection: unknown,
  iteratee: (value: unknown, key: string | number, collection: unknown) => unknown,
): void => {
  if (!isCollection(collection)) {
    return;
  }

  if (isArrayLike(collection)) {
    const source = collection as ArrayLike<unknown>;
    for (let index = source.length - 1; index >= 0; index -= 1) {
      iteratee(source[index], index, collection);
    }
    return;
  }

  const source = collection as Record<string, unknown>;
  const keys = Object.keys(source);
  for (let i = keys.length - 1; i >= 0; i -= 1) {
    const key = keys[i];
    iteratee(source[key], key, collection);
  }
};
