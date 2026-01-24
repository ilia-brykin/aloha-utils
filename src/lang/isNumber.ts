// Note: NaN is excluded on purpose. Use isNaN for that case.
export const isNumber = (value: unknown): value is number => typeof value === "number" && !Number.isNaN(value);

