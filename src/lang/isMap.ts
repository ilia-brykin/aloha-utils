import {
  toString,
} from "./_shared.js";

export const isMap = (value: unknown): value is Map<unknown, unknown> => toString.call(value) === "[object Map]";

