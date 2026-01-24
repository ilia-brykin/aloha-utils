import {
  toString,
} from "./_shared.js";

export const isWeakSet = (value: unknown): value is WeakSet<object> => toString.call(value) === "[object WeakSet]";

