import fc from "fast-check";
import { expect, test } from "vitest";
import { sanitize } from "./sanitize.mts";

test("accepts valid numbers", () => {
  fc.assert(
    fc.property(
      // At most six digits
      fc.integer({ min: 0, max: 999_999 }),
      (n) => {
        const result = sanitize(n.toString());
        expect(result).toEqual(n);
      },
    ),
  );
});

test("non-numbers get turned into empty string", () => {
  expect(sanitize("asdf")).toEqual("");
});

test("strips non-numbers out of the string", () => {
  expect(sanitize("asdf1234")).toEqual(1234);
});

test("strips strings longer than 6 digits", () => {
  expect(sanitize("1234567")).toEqual(123456);
});
