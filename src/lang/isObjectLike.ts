export const isObjectLike = (value: unknown): value is object => value !== null && typeof value === "object";

