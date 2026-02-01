import {
  isPlaceholder,
} from "./_placeholder.js";

export const mergeArgs = (
  partials: unknown[],
  args: unknown[],
  placeholder: unknown,
): unknown[] => {
  const result = partials.slice();
  let argIndex = 0;

  for (let i = 0; i < result.length && argIndex < args.length; i += 1) {
    if (isPlaceholder(result[i], placeholder)) {
      result[i] = args[argIndex];
      argIndex += 1;
    }
  }

  while (argIndex < args.length) {
    result.push(args[argIndex]);
    argIndex += 1;
  }

  return result;
};

export const mergeArgsRight = (
  partials: unknown[],
  args: unknown[],
  placeholder: unknown,
): unknown[] => {
  const reversed = mergeArgs(
    partials.slice().reverse(),
    args.slice().reverse(),
    placeholder,
  );
  return reversed.reverse();
};

export const countNonPlaceholders = (args: unknown[], placeholder: unknown): number =>
  args.reduce((count: number, value) => (isPlaceholder(value, placeholder) ? count : count + 1), 0);
