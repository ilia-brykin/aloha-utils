import {
  toString,
} from "./_shared.js";

export const isError = (value: unknown): value is Error => value instanceof Error || toString.call(value) === "[object Error]";

