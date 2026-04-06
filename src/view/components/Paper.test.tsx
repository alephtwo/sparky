import { afterEach, expect, test } from "vitest";
import { cleanup, render } from "@solidjs/testing-library";
import { Paper } from "./Paper";

afterEach(() => {
  cleanup();
});

test("renders children", () => {
  const { getByText } = render(() => <Paper>Test Content</Paper>);
  expect(getByText("Test Content")).toBeInTheDocument();
});

test("renders as a div element", () => {
  const { container } = render(() => <Paper>Content</Paper>);
  const div = container.querySelector("div");
  expect(div).toBeInTheDocument();
});

test("renders multiple children", () => {
  const { getByText } = render(() => (
    <Paper>
      <span>First</span>
      <span>Second</span>
    </Paper>
  ));
  expect(getByText("First")).toBeInTheDocument();
  expect(getByText("Second")).toBeInTheDocument();
});
