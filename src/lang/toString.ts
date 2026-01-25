import {
  isArray,
  isNil,
  isNumber,
  isString,
} from "./index.js";

/**
 * Converts a value to a string.
 *
 * @param {*} value - The value to convert.
 * @return {string} The string representation.
 *
 * @example
 * toString(false); // "false"
 * toString(null); // ""
 */
export const toString = (value: unknown): string => {
  if (isNil(value)) {
    return "";
  }

  if (isString(value)) {
    return value;
  }

  if (isArray(value)) {
    return value.map(item => toString(item)).join(",");
  }

  if (isNumber(value) && Object.is(value, -0)) {
    return "-0";
  }

  if (typeof value === "symbol") {
    return value.toString();
  }

  return String(value);
};
