/**
 * Converts a string to camelCase.
 *
 * @param {*} value - The value to convert.
 * @return {string} The camelCased string.
 *
 * @example
 * camelCase("Foo Bar"); // "fooBar"
 * camelCase("__FOO_BAR__"); // "fooBar"
 * camelCase('--foo-bar--'); // "fooBar"
 */
export const camelCase = (value: unknown): string => {
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
    .map((part, index) => {
      if (index === 0) {
        return part;
      }
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join("");
};
