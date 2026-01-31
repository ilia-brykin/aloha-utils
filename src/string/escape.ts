import {
  toString,
} from "../lang";

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;",
};

const reUnescapedHtml = /[&<>"']/g;
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

/**
 * Converts the characters "&", "<", ">", '"', and "'" in string to their
 * corresponding HTML entities.
 *
 * Note: No other characters are escaped. To escape additional characters,
 * use a third-party library like he.
 *
 * @param {string} [value=""] - The string to escape.
 * @return {string} The escaped string.
 *
 * @example
 * escape("<div class=\"x\">Tom & Jerry</div>");
 * // "&lt;div class=&quot;x&quot;&gt;Tom &amp; Jerry&lt;/div&gt";
 */
export const escape = (value?: unknown): string => {
  const stringValue = toString(value);
  if (stringValue.length === 0) {
    return "";
  }

  return reHasUnescapedHtml.test(stringValue) ?
    stringValue.replace(reUnescapedHtml, chr => HTML_ESCAPES[chr]) :
    stringValue;
};
