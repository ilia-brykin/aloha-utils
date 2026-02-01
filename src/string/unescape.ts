import {
  toString,
} from "../lang";

const htmlUnescapes: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": "\"",
  "&#39;": "'",
};

const reEscapedHtml = /&(amp|lt|gt|quot|#39);/g;
const reHasEscapedHtml = /&(amp|lt|gt|quot|#39);/;

/**
 * The inverse of escape; this method converts the HTML entities
 * &amp;, &lt;, &gt;, &quot;, and &#39; in string to their corresponding characters.
 *
 * @param {string} [value=""] - The string to unescape.
 * @return {string} The unescaped string.
 *
 * @example
 * unescape("fred, barney, &amp; pebbles"); // "fred, barney, & pebbles"
 */
export const unescape = (value?: unknown): string => {
  const stringValue = toString(value);
  if (stringValue.length === 0) {
    return "";
  }

  return reHasEscapedHtml.test(stringValue) ?
    stringValue.replace(reEscapedHtml, match => htmlUnescapes[match]) :
    stringValue;
};
