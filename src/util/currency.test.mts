import { beforeEach, expect, test, vi } from "vitest";

interface TestCase {
  desc: string;
  input: number;
  expected: string;
}

const cases: TestCase[] = [
  {
    desc: "small change",
    input: 100,
    expected: "￥100",
  },
  {
    desc: "big change",
    input: 1_000_000,
    expected: "￥1,000,000",
  },
];

beforeEach(() => {
  // Need to test static mutants
  vi.resetModules();
});

test("ensure proper formatting rules applied", async () => {
  const spy = vi.spyOn(Intl, "NumberFormat");
  await import("./currency.mts");
  expect(spy).toHaveBeenCalledExactlyOnceWith("ja-JP", {
    style: "currency",
    currency: "JPY",
  });
});

test.for<TestCase>(cases)("formats money ($desc)", async ({ input, expected }) => {
  const { formatCurrency } = await import("./currency.mts");
  expect(formatCurrency(input)).toEqual(expected);
});
