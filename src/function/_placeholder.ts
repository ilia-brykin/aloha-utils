export const PLACEHOLDER = { "__lodash_placeholder__": true } as const;

export const isPlaceholder = (value: unknown, placeholder: unknown): boolean =>
  value === placeholder;
