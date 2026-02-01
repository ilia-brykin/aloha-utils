import {
  isArrayLike,
  isObject,
  isString,
} from "../lang";

export const valuesOfCollection = (collection: unknown): unknown[] => {
  if (collection === null || collection === undefined) {
    return [];
  }

  if (isString(collection)) {
    return collection.split("");
  }

  if (isArrayLike(collection)) {
    const source = collection as ArrayLike<unknown>;
    const result: unknown[] = [];
    for (let i = 0; i < source.length; i += 1) {
      result.push(source[i]);
    }
    return result;
  }

  if (isObject(collection)) {
    return Object.values(collection as Record<string, unknown>);
  }

  return [];
};
