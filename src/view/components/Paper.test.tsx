import { cleanup, render } from "@solidjs/testing-library";
import { afterEach, expect, test } from "vitest";

import { Paper } from "./Paper";

afterEach(() => {
  cleanup();
});

test("renders children", () => {
  const dom = render(() => <Paper>Test Content</Paper>);
  expect(dom.getByText("Test Content")).toBeInTheDocument();
});

test("renders as a div element", () => {
  const { container } = render(() => <Paper>Content</Paper>);
  const div = container.querySelector("div");
  expect(div).toBeInTheDocument();
});

test("renders multiple children", () => {
  const dom = render(() => (
    <Paper>
      <span>First</span>
      <span>Second</span>
    </Paper>
  ));
  expect(dom.getByText("First")).toBeInTheDocument();
  expect(dom.getByText("Second")).toBeInTheDocument();
});
