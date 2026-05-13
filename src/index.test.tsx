import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { render } from "solid-js/web";
import { type JSX } from "solid-js";

vi.mock("./view/Sparky.tsx", () => ({
  Sparky: vi.fn<() => JSX.Element>(() => <div>fake sparky</div>),
}));

vi.mock("solid-js/web");

beforeEach(() => {
  vi.resetModules();
  vi.resetAllMocks();
});

afterEach(() => {
  // reset document
  document.body.innerHTML = "";
});

test("renders", async () => {
  vi.mocked(render).mockReturnValue(() => {});

  const mount = document.createElement("div");
  mount.id = "app";
  document.body.append(mount);

  await import("./index.tsx");

  expect(render).toHaveBeenCalledOnce();
});

test("no root", async () => {
  await expect(import("./index.tsx")).rejects.toThrow("Unable to find root mount point");
});
