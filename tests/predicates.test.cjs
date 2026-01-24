let utils;

beforeAll(async() => {
  utils = await import("../dist/index.js");
});

class Foo {
}

test("isPlainObject detects plain objects", () => {
  expect(utils.isPlainObject({})).toBe(true);
  expect(utils.isPlainObject(Object.create(null))).toBe(true);
  expect(utils.isPlainObject(new Foo())).toBe(false);
  expect(utils.isPlainObject([])).toBe(false);
});

test("isElement detects DOM elements", () => {
  const el = document.createElement("div");
  expect(utils.isElement(el)).toBe(true);
  expect(utils.isElement({})).toBe(false);
});

test("isNumber excludes NaN", () => {
  expect(utils.isNumber(1)).toBe(true);
  expect(utils.isNumber(NaN)).toBe(false);
  expect(utils.isNaN(NaN)).toBe(true);
});
