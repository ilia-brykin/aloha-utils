import {
  toString,
} from "./_shared.js";

export const isDate = (value: unknown): value is Date => toString.call(value) === "[object Date]";

