export const normalizePrecision = (precision: unknown): number => {
  return typeof precision === "number" && Number.isInteger(precision) ?
    precision :
    0;
};
