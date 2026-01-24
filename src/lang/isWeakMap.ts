import {
  toString,
} from "./_shared.js";

export const isWeakMap = (value: unknown): value is WeakMap<object, unknown> => toString.call(value) === "[object WeakMap]";

