import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  escapeRegExp,
} from "../../dist/index.js";

describe("escapeRegExp function", () => {
  it("should escape regexp special characters", () => {
    expect(escapeRegExp("[lodash](https://lodash.com/)"))
      .toBe("\\[lodash\\]\\(https://lodash\\.com/\\)");
    expect(escapeRegExp("^$.*+?()[]{}|")).toBe("\\^\\$\\.\\*\\+\\?\\(\\)\\[\\]\\{\\}\\|");
    expect(escapeRegExp("\\")).toBe("\\\\");
    expect(escapeRegExp("Price (USD) $5.99")).toBe("Price \\(USD\\) \\$5\\.99");
  });

  it("should not change strings without regexp characters", () => {
    expect(escapeRegExp("abc123")).toBe("abc123");
    expect(escapeRegExp("привет")).toBe("привет");
    expect(escapeRegExp("emoji 😊")).toBe("emoji 😊");
  });

  it("should handle empty string", () => {
    expect(escapeRegExp("")).toBe("");
  });

  it("should handle null and undefined", () => {
    expect(escapeRegExp(null)).toBe("");
    expect(escapeRegExp(undefined)).toBe("");
  });

  it("should handle non-string inputs via toString", () => {
    expect(escapeRegExp(123)).toBe("123");
    expect(escapeRegExp(-0)).toBe("-0");
    expect(escapeRegExp([1, 2, 3])).toBe("1,2,3");
  });

  it("should escape repeated special characters", () => {
    expect(escapeRegExp("..**??")).toBe("\\.\\.\\*\\*\\?\\?");
    expect(escapeRegExp("|||")).toBe("\\|\\|\\|");
  });

  it("should handle mixed text with special characters", () => {
    expect(escapeRegExp("file(name)[v1]{ok}|x")).toBe("file\\(name\\)\\[v1\\]\\{ok\\}\\|x");
  });

  it("should escape symbols via toString", () => {
    expect(escapeRegExp(Symbol("x"))).toBe("Symbol\\(x\\)");
  });
});
