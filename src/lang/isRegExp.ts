import {
  toString,
} from "./_shared.js";

export const isRegExp = (value: unknown): value is RegExp => toString.call(value) === "[object RegExp]";

