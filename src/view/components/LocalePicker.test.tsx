import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@solidjs/testing-library";
import { LocalePicker } from "./LocalePicker";
import * as runtime from "../../paraglide/runtime";

vi.mock("../../paraglide/runtime");

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

test("renders English and Japanese buttons", () => {
  render(() => <LocalePicker locale="en" onChange={() => {}} />);
  expect(screen.getByRole("button", { name: "A" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "あ" })).toBeInTheDocument();
});

test("highlights selected locale button", () => {
  const { unmount } = render(() => <LocalePicker locale="en" onChange={() => {}} />);
  const englishButton = screen.getByRole("button", { name: "A" });
  const japaneseButton = screen.getByRole("button", { name: "あ" });

  expect(englishButton).toHaveClass("bg-primary-content");
  expect(japaneseButton).not.toHaveClass("bg-primary-content");

  unmount();

  render(() => <LocalePicker locale="jp" onChange={() => {}} />);
  const englishButtonUpdated = screen.getByRole("button", { name: "A" });
  const japaneseButtonUpdated = screen.getByRole("button", { name: "あ" });

  expect(englishButtonUpdated).not.toHaveClass("bg-primary-content");
  expect(japaneseButtonUpdated).toHaveClass("bg-primary-content");
});

test("applies correct className when button is selected", () => {
  render(() => <LocalePicker locale="en" onChange={() => {}} />);
  const englishButton = screen.getByRole("button", { name: "A" });

  expect(englishButton).toHaveClass("btn", "join-item", "bg-primary-content");
  expect(englishButton.className).toBe("btn join-item bg-primary-content");
  expect(englishButton.className).not.toContain("Stryker");
});

test("applies correct className when button is not selected", () => {
  render(() => <LocalePicker locale="en" onChange={() => {}} />);
  const japaneseButton = screen.getByRole("button", { name: "あ" });

  expect(japaneseButton).not.toHaveClass("bg-primary-content");
  expect(japaneseButton).toHaveClass("btn", "join-item");
  expect(japaneseButton.className).toBe("btn join-item ");
  expect(japaneseButton.className).not.toContain("Stryker");
});

describe.for<{
  desc: string;
  buttonName: string;
  expectedLocale: runtime.Locale;
  initialLocale: runtime.Locale;
}>([
  { desc: "English", buttonName: "A", expectedLocale: "en", initialLocale: "jp" },
  { desc: "Japanese", buttonName: "あ", expectedLocale: "jp", initialLocale: "en" },
])("when $desc button is clicked", ({ buttonName, expectedLocale, initialLocale }) => {
  test("calls onChange", () => {
    const onChange = vi.fn();
    render(() => <LocalePicker locale={initialLocale} onChange={onChange} />);

    fireEvent.click(screen.getByRole("button", { name: buttonName }));
    expect(onChange).toHaveBeenCalledWith(expectedLocale);
  });

  test("calls setLocale with correct parameters", async () => {
    const onChange = vi.fn();
    render(() => <LocalePicker locale={initialLocale} onChange={onChange} />);

    fireEvent.click(screen.getByRole("button", { name: buttonName }));

    await waitFor(() => {
      expect(runtime.setLocale).toHaveBeenCalledWith(expectedLocale, { reload: false });
    });
  });
});

test("applies correct className structure", () => {
  const { container } = render(() => <LocalePicker locale="en" onChange={() => {}} />);
  const wrapper = container.querySelector(".join.join-horizontal");

  expect(wrapper).toHaveClass("rounded-sm", "border", "border-slate-500");
});
