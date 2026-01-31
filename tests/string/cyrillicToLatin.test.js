import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  cyrillicToLatin,
} from "../../dist/index.js";

describe("cyrillicToLatin function", () => {
  it("should transliterate basic Russian text", () => {
    expect(cyrillicToLatin("Привет, мир!")).toBe("Privet, mir!");
    expect(cyrillicToLatin("съешь ещё этих мягких французских булок")).toBe("sesh eshchyo etikh myagkikh frantsuzskikh bulok");
  });

  it("should transliterate digraph letters", () => {
    expect(cyrillicToLatin("Жж Шш Щщ Чч")).toBe("Zhzh Shsh Shchshch Chch");
    expect(cyrillicToLatin("Хх Цц")).toBe("Khkh Tsts");
  });

  it("should transliterate Ukrainian and Belarusian letters", () => {
    expect(cyrillicToLatin("ҐЄІЇ ґєії")).toBe("GYeIYi gyeiyi");
    expect(cyrillicToLatin("Ўў")).toBe("Uu");
  });

  it("should transliterate Serbian/Macedonian letters", () => {
    expect(cyrillicToLatin("Ђђ Ѓѓ Ѕѕ Љљ Њњ Ћћ Ќќ Џџ Јј"))
      .toBe("Djdj Gjgj Dzdz Ljlj Njnj Cc Kjkj Dzhdzh Jj");
  });

  it("should transliterate Serbian words (Cyrillic)", () => {
    expect(cyrillicToLatin("Љубав и њежност")).toBe("Ljubav i njezhnost");
    expect(cyrillicToLatin("Џак, ђак и ћирилица")).toBe("Dzhak, djak i cirilitsa");
  });

  it("should transliterate Macedonian words (Cyrillic)", () => {
    expect(cyrillicToLatin("Љубов и нежност")).toBe("Ljubov i nezhnost");
    expect(cyrillicToLatin("Ѓавол и џем")).toBe("Gjavol i dzhem");
  });

  it("should transliterate Bulgarian words (Cyrillic)", () => {
    expect(cyrillicToLatin("Щъркел и жълъд")).toBe("Shchrkel i zhld");
    expect(cyrillicToLatin("Юг и ягода")).toBe("Yug i yagoda");
  });

  it("should transliterate Ukrainian and Belarusian words (Cyrillic)", () => {
    expect(cyrillicToLatin("Їжак і ґанок")).toBe("Yizhak i ganok");
    expect(cyrillicToLatin("Ўзлёт і сьнег")).toBe("Uzlyot i sneg");
  });

  it("should leave non-Cyrillic characters unchanged", () => {
    expect(cyrillicToLatin("Hello 123!")).toBe("Hello 123!");
    expect(cyrillicToLatin("München 東京")).toBe("München 東京");
  });

  it("should leave non-letter Cyrillic signs unchanged", () => {
    expect(cyrillicToLatin("҈҉")).toBe("҈҉");
  });

  it("should leave historical letters unchanged", () => {
    expect(cyrillicToLatin("Ѣѣ Ѳѳ Ѵѵ")).toBe("Ѣѣ Ѳѳ Ѵѵ");
  });

  it("should handle null and undefined", () => {
    expect(cyrillicToLatin(null)).toBe("");
    expect(cyrillicToLatin(undefined)).toBe("");
  });
});
