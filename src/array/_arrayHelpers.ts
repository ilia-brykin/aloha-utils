import {
  isArray,
} from "../lang/isArray.js";

export const flattenValues = (values: unknown[]): unknown[] => {
  if (values.length === 0) {
    return [];
  }

  const result: unknown[] = [];
  for (const value of values) {
    if (isArray(value)) {
      result.push(...value);
    }
  }
  return result;
};
