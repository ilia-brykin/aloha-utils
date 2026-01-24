/**
 * Checks if a value is a symbol.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a symbol.
 *
 * @example
 * isSymbol(Symbol("x")); // true
 * isSymbol("x"); // false
 */
export const isSymbol = (value: unknown): value is symbol => {
  return typeof value === "symbol" || value instanceof Symbol;
};
