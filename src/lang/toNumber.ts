import {
  isArray,
  isBoolean,
  isNil,
  isNumber,
  isString,
  isSymbol,
} from "./index.js";

/**
 * Converts a value to a number.
 *
 * @param {*} value - The value to convert.
 * @return {number} The numeric representation.
 *
 * @example
 * toNumber(false); // 0
 * toNumber(true); // 1
 */
export const toNumber = (value: unknown): number => {
  if (isNil(value)) {
    return 0;
  }

  if (isNumber(value)) {
    return value;
  }

  if (isBoolean(value)) {
    return value ? 1 : 0;
  }

  if (isString(value)) {
    return Number(value.trim());
  }

  if (isArray(value)) {
    return Number(value.toString());
  }

  if (isSymbol(value)) {
    return Number.NaN;
  }

  return Number(value);
};
