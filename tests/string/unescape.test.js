import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  unescape,
} from "../../dist/index.js";

describe("unescape function", () => {
  it("should unescape basic entities", () => {
    expect(unescape("fred, barney, &amp; pebbles")).toBe("fred, barney, & pebbles");
    expect(unescape("&lt;div&gt;")).toBe("<div>");
    expect(unescape("&quot;quote&quot;")).toBe("\"quote\"");
    expect(unescape("it&#39;s")).toBe("it's");
    expect(unescape("&amp;lt;")).toBe("&lt;");
  });

  it("should unescape mixed entities", () => {
    expect(unescape("a &lt; b &amp;&amp; b &gt; c")).toBe("a < b && b > c");
    expect(unescape("&quot;rock&#39;n&#39;roll&quot;")).toBe("\"rock'n'roll\"");
    expect(unescape("&lt;span&gt;Tom &amp; Jerry&lt;/span&gt;"))
      .toBe("<span>Tom & Jerry</span>");
  });

  it("should not unescape other entities", () => {
    expect(unescape("&nbsp;")).toBe("&nbsp;");
    expect(unescape("&copy;")).toBe("&copy;");
    expect(unescape("&ampersand;")).toBe("&ampersand;");
  });

  it("should handle repeated entities", () => {
    expect(unescape("&amp;&amp;&amp;")).toBe("&&&");
    expect(unescape("&lt;&lt;&gt;&gt;")).toBe("<<>>");
    expect(unescape("&quot;&quot;&#39;&#39;")).toBe("\"\"''");
  });

  it("should handle empty string", () => {
    expect(unescape("")).toBe("");
  });

  it("should handle null and undefined", () => {
    expect(unescape(null)).toBe("");
    expect(unescape(undefined)).toBe("");
  });

  it("should handle non-string inputs via toString", () => {
    expect(unescape(123)).toBe("123");
    expect(unescape(-0)).toBe("-0");
    expect(unescape([1, 2, 3])).toBe("1,2,3");
    expect(unescape(true)).toBe("true");
  });

  it("should handle symbols via toString", () => {
    expect(unescape(Symbol("x"))).toBe("Symbol(x)");
  });

  it("should not touch non-entity ampersands", () => {
    expect(unescape("Tom & Jerry")).toBe("Tom & Jerry");
    expect(unescape("x && y")).toBe("x && y");
    expect(unescape("a & b &amp c")).toBe("a & b &amp c");
  });

  it("should handle text without entities", () => {
    expect(unescape("plain text")).toBe("plain text");
  });
});
