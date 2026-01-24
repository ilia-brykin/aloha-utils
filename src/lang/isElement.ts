/**
 * Checks if a value is a DOM Element.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is an Element.
 *
 * @example
 * isElement(document.createElement("div")); // true
 * isElement({}); // false
 */
export const isElement = (value: unknown): value is Element => {
  if (typeof Element !== "undefined" && value instanceof Element) {
    return true;
  }

  return (
    value !== null &&
    typeof value === "object" &&
    (value as { nodeType?: unknown }).nodeType === 1 &&
    typeof (value as { nodeName?: unknown }).nodeName === "string"
  );
};

