import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  deburr,
} from "../../dist/index.js";

describe("deburr function", () => {
  it("should deburr common accented letters", () => {
    expect(deburr("déjà vu")).toBe("deja vu");
    expect(deburr("ÀÁÂÃÄÅ")).toBe("AAAAAA");
    expect(deburr("àáâãäå")).toBe("aaaaaa");
    expect(deburr("Çç")).toBe("Cc");
    expect(deburr("Ññ")).toBe("Nn");
    expect(deburr("Öö")).toBe("Oo");
    expect(deburr("Üü")).toBe("Uu");
    expect(deburr("Ýÿ")).toBe("Yy");
  });

  it("should deburr Latin Extended-A letters", () => {
    expect(deburr("Łódź")).toBe("Lodz");
    expect(deburr("Český")).toBe("Cesky");
    expect(deburr("Ħĥ")).toBe("Hh");
    expect(deburr("İı")).toBe("Ii");
    expect(deburr("Ŋŋ")).toBe("Nn");
    expect(deburr("Ŵŵ")).toBe("Ww");
    expect(deburr("Žž")).toBe("Zz");
  });

  it("should handle mixed Latin and non-Latin text", () => {
    expect(deburr("déjà привет")).toBe("deja привет");
    expect(deburr("München 東京")).toBe("Munchen 東京");
    expect(deburr("élève 漢字 😊")).toBe("eleve 漢字 😊");
  });

  it("should deburr ligatures and special letters", () => {
    expect(deburr("Æneid")).toBe("Aeneid");
    expect(deburr("œuvre")).toBe("oeuvre");
    expect(deburr("Þingvellir")).toBe("Thingvellir");
    expect(deburr("straße")).toBe("strasse");
    expect(deburr("Ĳssel")).toBe("IJssel");
    expect(deburr("ĳssel")).toBe("ijssel");
    expect(deburr("ŉ")).toBe("'n");
  });

  it("should remove combining diacritical marks", () => {
    expect(deburr("e\u0301")).toBe("e");
    expect(deburr("n\u0303")).toBe("n");
    expect(deburr("a\u0308")).toBe("a");
    expect(deburr("o\u0302\u0301")).toBe("o");
  });

  it("should remove multiple combining marks in longer strings", () => {
    expect(deburr("Cafe\u0301 au lait")).toBe("Cafe au lait");
    expect(deburr("na\u0308ive co\u0308operate")).toBe("naive cooperate");
  });

  it("should leave non-Latin characters unchanged", () => {
    expect(deburr("привет мир")).toBe("привет мир");
    expect(deburr("漢字")).toBe("漢字");
    expect(deburr("مرحبا")).toBe("مرحبا");
  });

  it("should not change already basic Latin letters", () => {
    expect(deburr("plain ASCII")).toBe("plain ASCII");
    expect(deburr("The quick brown fox")).toBe("The quick brown fox");
  });

  it("should preserve punctuation and symbols", () => {
    expect(deburr("déjà-vu!")).toBe("deja-vu!");
    expect(deburr("façade? yes.")).toBe("facade? yes.");
  });

  it("should handle empty and whitespace strings", () => {
    expect(deburr("")).toBe("");
    expect(deburr("   ")).toBe("   ");
  });

  it("should handle null and undefined", () => {
    expect(deburr(null)).toBe("");
    expect(deburr(undefined)).toBe("");
  });

  it("should handle numbers and symbols via toString", () => {
    expect(deburr(123)).toBe("123");
    expect(deburr(-0)).toBe("-0");
    expect(deburr(Symbol("x"))).toBe("Symbol(x)");
  });

  it("should handle arrays via toString", () => {
    expect(deburr(["déjà", "vu"])).toBe("deja,vu");
  });

  it("should handle strings with only combining marks", () => {
    expect(deburr("\u0301\u0308")).toBe("");
  });

  it("should handle multiple deburrable letters in sequence", () => {
    expect(deburr("ÁáÉéÍíÓóÚú")).toBe("AaEeIiOoUu");
  });

  it("should keep quotes and apostrophes", () => {
    expect(deburr("l\u2019été")).toBe("l\u2019ete");
    expect(deburr("l'été")).toBe("l'ete");
  });
});
