import {
  toString,
} from "./_shared.js";

export const isArrayBuffer = (value: unknown): value is ArrayBuffer => toString.call(value) === "[object ArrayBuffer]";

