import {
  toString,
} from "../lang/toString.js";

export const createPadding = (length: number, chars: unknown): string => {
  if (length <= 0) {
    return "";
  }

  const paddingChars = toString(chars);
  if (paddingChars.length === 0) {
    return "";
  }

  const repeatCount = Math.ceil(length / paddingChars.length);
  const repeated = paddingChars.repeat(repeatCount);
  return repeated.slice(0, length);
};
