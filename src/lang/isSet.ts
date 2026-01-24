import {
  toString,
} from "./_shared.js";

export const isSet = (value: unknown): value is Set<unknown> => toString.call(value) === "[object Set]";

