import {
  eq,
  isArray,
} from "../lang";

export const baseSortedIndex = <T>(
  array: T[],
  value: T,
  mapper: (value: unknown) => unknown,
  retHighest: boolean,
): number => {
  if (!isArray(array)) {
    return 0;
  }

  const length = array.length;
  if (length === 0) {
    return 0;
  }

  const valueComputed = mapper(value) as number | string;
  let low = 0;
  let high = length;

  while (low < high) {
    const mid = (low + high) >>> 1;
    const computed = mapper(array[mid]) as number | string;
    const shouldMoveRight = computed < valueComputed ||
      (retHighest && eq(computed, valueComputed));

    if (shouldMoveRight) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
};
