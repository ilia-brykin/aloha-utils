import {
  toString,
} from "./_shared.js";

export const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (toString.call(value) !== "[object Object]") {
    return false;
  }

  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
};

