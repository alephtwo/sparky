import * as React from "react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { createRoot, Root } from "react-dom/client";

vi.mock("./view/Sparky.tsx", () => ({
  Sparky: <div>fake sparky</div>,
}));

vi.mock("react");
vi.mock("react-dom/client");

beforeEach(() => {
  vi.resetModules();
  vi.resetAllMocks();
});

afterEach(() => {
  // reset document
  document.body.innerHTML = "";
});

test("renders", async () => {
  const mockRoot: Root = { render: vi.fn(), unmount: vi.fn() };
  vi.mocked(createRoot).mockReturnValue(mockRoot);

  const mount = document.createElement("div");
  mount.id = "app";
  document.body.append(mount);

  await import("./index.tsx");

  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(mockRoot.render).toHaveBeenCalledOnce();
});

test("no root", async () => {
  await expect(import("./index.tsx")).rejects.toThrow("Unable to find root mount point");
});
