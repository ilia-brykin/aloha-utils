import {
  eq,
} from "../lang";

export const includesSameValueZero = (array: unknown[], value: unknown): boolean => {
  return array.some(item => eq(item, value));
};

export const includesWith = (
  array: unknown[],
  value: unknown,
  comparator?: (arrVal: unknown, othVal: unknown) => unknown,
): boolean => {
  if (comparator) {
    return array.some(item => comparator(value, item));
  }

  return includesSameValueZero(array, value);
};
