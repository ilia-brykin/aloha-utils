import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  escape,
} from "../../dist/index.js";

describe("escape function", () => {
  it("should escape html characters", () => {
    expect(escape("fred, barney, & pebbles")).toBe("fred, barney, &amp; pebbles");
    expect(escape("5 > 3")).toBe("5 &gt; 3");
    expect(escape("<div>")).toBe("&lt;div&gt;");
    expect(escape("\"quote\"")).toBe("&quot;quote&quot;");
    expect(escape("it's")).toBe("it&#39;s");
    expect(escape("Tom & Jerry <3")).toBe("Tom &amp; Jerry &lt;3");
  });

  it("should escape mixed characters", () => {
    expect(escape("a & b < c > d")).toBe("a &amp; b &lt; c &gt; d");
    expect(escape("rock 'n' \"roll\"")).toBe("rock &#39;n&#39; &quot;roll&quot;");
    expect(escape("x<y&z>")).toBe("x&lt;y&amp;z&gt;");
    expect(escape("<<'&'>>")).toBe("&lt;&lt;&#39;&amp;&#39;&gt;&gt;");
  });

  it("should not escape other characters", () => {
    expect(escape("abc")).toBe("abc");
    expect(escape("ümlaut")).toBe("ümlaut");
    expect(escape("привет")).toBe("привет");
    expect(escape("123")).toBe("123");
  });

  it("should handle empty string", () => {
    expect(escape("")).toBe("");
  });

  it("should not double-escape existing entities", () => {
    expect(escape("&amp;")).toBe("&amp;amp;");
    expect(escape("&lt;")).toBe("&amp;lt;");
  });

  it("should handle repeated characters", () => {
    expect(escape("&&&&")).toBe("&amp;&amp;&amp;&amp;");
    expect(escape("<<<<>>>>")).toBe("&lt;&lt;&lt;&lt;&gt;&gt;&gt;&gt;");
  });

  it("should handle strings with newlines and tabs", () => {
    expect(escape("a\tb\nc")).toBe("a\tb\nc");
    expect(escape("x <\n y")).toBe("x &lt;\n y");
  });

  it("should handle null and undefined", () => {
    expect(escape(null)).toBe("");
    expect(escape(undefined)).toBe("");
  });

  it("should handle non-string inputs via toString", () => {
    expect(escape(123)).toBe("123");
    expect(escape(-0)).toBe("-0");
    expect(escape([1, 2, 3])).toBe("1,2,3");
  });

  it("should escape symbols via toString", () => {
    expect(escape(Symbol("x"))).toBe("Symbol(x)");
  });
});
