import {
  resolveIteratee,
} from "../shared/iteratee.js";

export type ArrayIteratee = ((value: unknown) => unknown) | string;

const identity = (value: unknown): unknown => value;

export const resolveArrayIteratee = (
  iteratee?: ArrayIteratee,
): ((value: unknown) => unknown) => {
  if (iteratee === undefined) {
    return identity;
  }

  return resolveIteratee(iteratee);
};
