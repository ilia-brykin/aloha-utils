import {
  toString,
} from "../lang";


const CYRILLIC_TO_LATIN: Record<string, string> = {
  Ѐ: "E",
  ѐ: "e",
  Ё: "Yo",
  ё: "yo",
  Ђ: "Dj",
  ђ: "dj",
  Ѓ: "Gj",
  ѓ: "gj",
  Є: "Ye",
  є: "ye",
  Ѕ: "Dz",
  ѕ: "dz",
  І: "I",
  і: "i",
  Ї: "Yi",
  ї: "yi",
  Ј: "J",
  ј: "j",
  Љ: "Lj",
  љ: "lj",
  Њ: "Nj",
  њ: "nj",
  Ћ: "C",
  ћ: "c",
  Ќ: "Kj",
  ќ: "kj",
  Ѝ: "I",
  ѝ: "i",
  Ў: "U",
  ў: "u",
  Џ: "Dzh",
  џ: "dzh",
  А: "A",
  а: "a",
  Б: "B",
  б: "b",
  В: "V",
  в: "v",
  Г: "G",
  г: "g",
  Д: "D",
  д: "d",
  Е: "E",
  е: "e",
  Ж: "Zh",
  ж: "zh",
  З: "Z",
  з: "z",
  И: "I",
  и: "i",
  Й: "Y",
  й: "y",
  К: "K",
  к: "k",
  Л: "L",
  л: "l",
  М: "M",
  м: "m",
  Н: "N",
  н: "n",
  О: "O",
  о: "o",
  П: "P",
  п: "p",
  Р: "R",
  р: "r",
  С: "S",
  с: "s",
  Т: "T",
  т: "t",
  У: "U",
  у: "u",
  Ф: "F",
  ф: "f",
  Х: "Kh",
  х: "kh",
  Ц: "Ts",
  ц: "ts",
  Ч: "Ch",
  ч: "ch",
  Ш: "Sh",
  ш: "sh",
  Щ: "Shch",
  щ: "shch",
  Ъ: "",
  ъ: "",
  Ы: "Y",
  ы: "y",
  Ь: "",
  ь: "",
  Э: "E",
  э: "e",
  Ю: "Yu",
  ю: "yu",
  Я: "Ya",
  я: "ya",
  Ґ: "G",
  ґ: "g",
};

/**
 * Transliterate Cyrillic letters to Latin (BGN/PCGN-style, non-contextual).
 * Non-letter symbols and historical letters are left unchanged.
 *
 * @param {string} [value=""] - The string to transliterate.
 * @return {string} The transliterated string.
 *
 * @example
 * cyrillicToLatin("Привет, мир!"); // "Privet, mir!"
 */
export const cyrillicToLatin = (value?: unknown): string => {
  const input = toString(value);
  if (input.length === 0) {
    return "";
  }

  let result = "";
  for (const ch of input) {
    result += CYRILLIC_TO_LATIN[ch] ?? ch;
  }
  return result;
};
