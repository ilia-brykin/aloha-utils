export const splitWords = (value: string): string[] => {
  const normalized = value.replace(
    /([\p{Ll}\p{Nd}])(\p{Lu})/gu,
    "$1 $2",
  );
  return normalized.match(/[\p{L}\p{N}]+/gu) ?? [];
};

export const toLowerWords = (value: string): string[] => {
  return splitWords(value).map(part => part.toLowerCase());
};
