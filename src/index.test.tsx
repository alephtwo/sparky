import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { render } from "solid-js/web";

vi.mock("./view/Sparky.tsx", () => ({
  Sparky: () => <div>fake sparky</div>,
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

  expect(vi.mocked(render)).toHaveBeenCalledOnce();
});

test("no root", async () => {
  await expect(import("./index.tsx")).rejects.toThrow("Unable to find root mount point");
});
