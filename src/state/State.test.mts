import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { initialState, reducer, State } from "./State.mts";
import { locales } from "../paraglide/runtime";
import { getLocale } from "../paraglide/runtime";
import fc from "fast-check";

vi.mock("../paraglide/runtime", async (importOriginal) => {
  const original = await importOriginal<typeof import("../paraglide/runtime")>();
  return {
    ...original,
    getLocale: vi.fn(),
  };
});

beforeEach(() => {
  // default all tests to "en"
  vi.mocked(getLocale).mockReturnValue("en");
});

afterEach(() => {
  vi.resetAllMocks();
});

test.for(locales)("assert initial state (%s)", async (locale) => {
  vi.resetModules();
  vi.mocked(getLocale).mockReturnValue(locale);

  const { initialState } = await import("./State.mts");
  expect(initialState).toEqual({
    locale: locale,
    crystals: "",
    tickets: "",
    tenPartTickets: "",
    sparks: "",
  } as State);
});

test("set-crystals", () => {
  fc.assert(
    fc.property(fc.integer({ min: 0 }), (crystals) => {
      const result = reducer(initialState, {
        action: "set-crystals",
        value: crystals,
      });
      expect(result).toEqual({ ...initialState, crystals });
    }),
  );
});

test("set-tickets", () => {
  fc.assert(
    fc.property(fc.integer({ min: 0 }), (tickets) => {
      const result = reducer(initialState, {
        action: "set-tickets",
        value: tickets,
      });
      expect(result).toEqual({ ...initialState, tickets });
    }),
  );
});

test("set-ten-part-tickets", () => {
  fc.assert(
    fc.property(fc.integer({ min: 0 }), (tickets) => {
      const result = reducer(initialState, {
        action: "set-ten-part-tickets",
        value: tickets,
      });
      expect(result).toEqual({ ...initialState, tenPartTickets: tickets });
    }),
  );
});

test("set-sparks", () => {
  fc.assert(
    fc.property(fc.integer({ min: 0 }), (sparks) => {
      const result = reducer(initialState, {
        action: "set-sparks",
        value: sparks,
      });
      expect(result).toEqual({ ...initialState, sparks });
    }),
  );
});

test.for(locales)("set-locale (%s)", (locale) => {
  const result = reducer(initialState, {
    action: "set-locale",
    value: locale,
  });

  expect(result).toEqual({ ...initialState, locale });
});

test("unknown action", () => {
  // @ts-expect-error we're testing an error condition here
  expect(reducer(initialState, { action: "unknown-action" })).toEqual(initialState);
});
