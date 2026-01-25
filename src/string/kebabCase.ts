/**
 * Converts a string to kebab-case.
 *
 * @param {*} value - The value to convert.
 * @return {string} The kebab-cased string.
 *
 * @example
 * kebabCase("Foo Bar"); // "foo-bar"
 * kebabCase("fooBar"); // "foo-bar"
 */
export const kebabCase = (value: unknown): string => {
  if (typeof value !== "string") {
    return "";
  }

  const normalized = value.replace(
    /([\p{Ll}\p{Nd}])(\p{Lu})/gu,
    "$1 $2",
  );
  const parts = normalized.match(/[\p{L}\p{N}]+/gu);
  if (!parts) {
    return "";
  }

  return parts
    .map(part => part.toLowerCase())
    .join("-");
};
