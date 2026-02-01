import {
  isArray,
} from "../lang";

export const flattenDepthInternal = (
  array: unknown[],
  depth: number,
): unknown[] => {
  if (depth < 1) {
    return array.slice();
  }

  const result: unknown[] = [];
  for (const value of array) {
    if (isArray(value)) {
      if (depth === 1) {
        result.push(...value);
      } else {
        result.push(...flattenDepthInternal(value, depth - 1));
      }
    } else {
      result.push(value);
    }
  }

  return result;
};
