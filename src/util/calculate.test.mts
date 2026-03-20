import { expect, test } from "vitest";
import { calculate } from "./calculate.mts";
import fc from "fast-check";

test("happy path", () => {
  const arb = fc.record({
    tickets: fc.integer({ min: 0 }),
    tenPartTickets: fc.integer({ min: 0 }),
    crystals: fc.integer({ min: 0 }),
    sparks: fc.integer({ min: 0 }),
  });

  fc.assert(
    fc.property(arb, (args) => {
      const expected = args.tickets + args.tenPartTickets * 10 + Math.floor(args.crystals / 300) + args.sparks;
      expect(calculate(args)).toEqual(expected);
    }),
  );
});
