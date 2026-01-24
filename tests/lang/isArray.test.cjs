let utils;

beforeAll(async() => {
  utils = await import("../../dist/index.js");
});

test("isArray detects arrays", () => {
  expect(utils.isArray([])).toBe(true);
  expect(utils.isArray([1, 2])).toBe(true);
  expect(utils.isArray("test")).toBe(false);
  expect(utils.isArray({})).toBe(false);
  expect(utils.isArray(null)).toBe(false);
});
