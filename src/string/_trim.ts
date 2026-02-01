import {
  toString,
} from "../lang";

const reTrim = /^\s+|\s+$/g;
const reTrimStart = /^\s+/g;
const reTrimEnd = /\s+$/g;

type TrimMode = "both" | "start" | "end";

const trimWithChars = (value: string, chars: string, mode: TrimMode): string => {
  if (chars.length === 0 || value.length === 0) {
    return value;
  }

  const set = new Set(chars);
  let start = 0;
  let end = value.length;

  if (mode !== "end") {
    while (start < end && set.has(value[start])) {
      start += 1;
    }
  }

  if (mode !== "start") {
    while (end > start && set.has(value[end - 1])) {
      end -= 1;
    }
  }

  return value.slice(start, end);
};

export const trimCore = (value: unknown, chars: unknown, mode: TrimMode): string => {
  const stringValue = toString(value);

  if (chars === undefined) {
    if (mode === "start") {
      return stringValue.replace(reTrimStart, "");
    }
    if (mode === "end") {
      return stringValue.replace(reTrimEnd, "");
    }
    return stringValue.replace(reTrim, "");
  }

  const charsValue = toString(chars);
  return trimWithChars(stringValue, charsValue, mode);
};
