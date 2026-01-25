/**
 * Converts a string to snake_case.
 *
 * @param {*} value - The value to convert.
 * @return {string} The snake_cased string.
 *
 * @example
 * snakeCase("Foo Bar"); // "foo_bar"
 * snakeCase("fooBar"); // "foo_bar"
 */
export const snakeCase = (value: unknown): string => {
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
    .join("_");
};
