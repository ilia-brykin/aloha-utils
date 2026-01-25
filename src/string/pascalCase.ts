/**
 * Converts a string to PascalCase.
 *
 * @param {*} value - The value to convert.
 * @return {string} The PascalCased string.
 *
 * @example
 * pascalCase("foo bar"); // "FooBar"
 * pascalCase("__FOO_BAR__"); // "FooBar"
 */
export const pascalCase = (value: unknown): string => {
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
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
};
