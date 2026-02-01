import {
  toInteger,
  toString,
} from "../lang";

type TruncateOptions = {
  length?: number;
  omission?: string;
  separator?: RegExp | string;
};

/**
 * Truncates string if it's longer than the given maximum string length.
 * The last characters of the truncated string are replaced with the omission
 * string which defaults to "...".
 *
 * @param {string} [value=""] - The string to truncate.
 * @param {Object} [options={}] - The options object.
 * @param {number} [options.length=30] - The maximum string length.
 * @param {string} [options.omission="..."] - The string to indicate text is omitted.
 * @param {RegExp|string} [options.separator] - The separator pattern to truncate to.
 * @return {string} The truncated string.
 *
 * @example
 * truncate("aloha aloha aloha", { length: 10 }); // "aloha a..."
 * truncate("aloha aloha", { length: 10, omission: " [..]" }); // "aloha [..]"
 */
export const truncate = (value?: unknown, options: TruncateOptions = {}): string => {
  const stringValue = toString(value);
  const length = options.length === undefined ? 30 : toInteger(options.length);
  const omission = options.omission === undefined ? "..." : toString(options.omission);

  if (length <= 0) {
    return "";
  }

  if (stringValue.length <= length) {
    return stringValue;
  }

  const omissionLength = omission.length;
  if (omissionLength >= length) {
    return omission.slice(0, length);
  }

  const end = length - omissionLength;
  let truncated = stringValue.slice(0, end);

  const { separator } = options;
  if (separator !== undefined) {
    if (typeof separator === "string" && separator !== "") {
      const index = truncated.lastIndexOf(separator);
      if (index > -1) {
        truncated = truncated.slice(0, index);
      }
    } else if (separator instanceof RegExp) {
      const flags = separator.flags.includes("g") ? separator.flags : `${ separator.flags }g`;
      const globalSeparator = new RegExp(separator.source, flags);
      let lastIndex = -1;
      while (true) {
        const match = globalSeparator.exec(truncated);
        if (match === null) {
          break;
        }
        lastIndex = match.index;
      }
      if (lastIndex > -1) {
        truncated = truncated.slice(0, lastIndex);
      }
    }
  }

  return `${ truncated }${ omission }`;
};
