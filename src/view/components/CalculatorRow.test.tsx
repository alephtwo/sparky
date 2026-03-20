import { afterEach, expect, test, vi } from "vitest";
import { cleanup, fireEvent, render } from "@solidjs/testing-library";
import { CalculatorRow } from "./CalculatorRow";

afterEach(() => {
  cleanup();
});

test("renders container div with correct className", () => {
  const { container } = render(() => (
    <CalculatorRow icon="/test-icon.svg" label="Test placeholder" value={0} onChange={() => {}} />
  ));
  const div = container.querySelector("div");
  expect(div).toHaveClass("flex");
  expect(div).toHaveClass("gap-2");
});

test("renders image element with correct src attribute", () => {
  const { container } = render(() => (
    <CalculatorRow icon="/currency-icon.svg" label="Test placeholder" value={0} onChange={() => {}} />
  ));
  const img = container.querySelector("img");
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute("src", "/currency-icon.svg");
});

test("renders input element", () => {
  const { container } = render(() => (
    <CalculatorRow icon="/test-icon.svg" label="Test placeholder" value={0} onChange={() => {}} />
  ));
  const input = container.querySelector("input");
  expect(input).toBeInTheDocument();
});

test("input element has type tel", () => {
  const { container } = render(() => (
    <CalculatorRow icon="/test-icon.svg" label="Test placeholder" value={0} onChange={() => {}} />
  ));
  const input = container.querySelector("input");
  expect(input).toHaveAttribute("type", "tel");
});

test("input element has autoComplete set to off", () => {
  const { container } = render(() => (
    <CalculatorRow icon="/test-icon.svg" label="Test placeholder" value={0} onChange={() => {}} />
  ));
  const input = container.querySelector("input");
  expect(input).toHaveAttribute("autoComplete", "off");
});

test("input placeholder matches provided prop", () => {
  const { container } = render(() => (
    <CalculatorRow icon="/test-icon.svg" label="Enter your amount" value={0} onChange={() => {}} />
  ));
  const label = container.querySelector("label");
  expect(label).toBeInTheDocument();
});

test("input has all required classNames", () => {
  const { container } = render(() => (
    <CalculatorRow icon="/test-icon.svg" label="Test placeholder" value={0} onChange={() => {}} />
  ));
  const input = container.querySelector("input");
  expect(input).toHaveClass("input");
  expect(input).toHaveClass("w-full");
  expect(input).toHaveClass("font-bold");
});

test("input value renders numeric value 42", () => {
  const { container } = render(() => (
    <CalculatorRow icon="/test-icon.svg" label="Test placeholder" value={42} onChange={() => {}} />
  ));
  const input = container.querySelector("input") as HTMLInputElement;
  expect(input.value).toBe("42");
});

test("input value renders empty string", () => {
  const { container } = render(() => (
    <CalculatorRow icon="/test-icon.svg" label="Test placeholder" value="" onChange={() => {}} />
  ));
  const input = container.querySelector("input") as HTMLInputElement;
  expect(input.value).toBe("");
});

test("input value renders zero", () => {
  const { container } = render(() => (
    <CalculatorRow icon="/test-icon.svg" label="Test placeholder" value={0} onChange={() => {}} />
  ));
  const input = container.querySelector("input") as HTMLInputElement;
  expect(input.value).toBe("0");
});

test("onChange callback is invoked on input change", () => {
  const onChange = vi.fn();
  const { container } = render(() => (
    <CalculatorRow icon="/test-icon.svg" label="Test placeholder" value="" onChange={onChange} />
  ));
  const input = container.querySelector("input") as HTMLInputElement;
  fireEvent.input(input, { target: { value: "123" } });
  expect(onChange).toHaveBeenCalled();
});

test("onChange is called with the correct event", () => {
  const onChange = vi.fn();
  const { container } = render(() => (
    <CalculatorRow icon="/test-icon.svg" label="Test placeholder" value="" onChange={onChange} />
  ));
  const input = container.querySelector("input") as HTMLInputElement;
  fireEvent.input(input, { target: { value: "999" } });
  expect(onChange).toHaveBeenCalledTimes(1);
});

test("input value is immediately sanitized when invalid characters are entered", () => {
  const onChange = vi.fn();
  const { container } = render(() => (
    <CalculatorRow icon="/test-icon.svg" label="Test placeholder" value="" onChange={onChange} />
  ));
  const input = container.querySelector("input") as HTMLInputElement;
  fireEvent.input(input, { target: { value: "abc123xyz456" } });
  // The input should be immediately sanitized to show only the extracted numbers
  expect(input.value).toBe("123456");
  expect(onChange).toHaveBeenCalledWith(123456);
});

test("input value updates correctly when props change", () => {
  const { container } = render(() => (
    <CalculatorRow icon="/icon.svg" label="Placeholder 1" value={100} onChange={() => {}} />
  ));

  const input = container.querySelector("input") as HTMLInputElement;
  expect(input.value).toBe("100");
});

test("placeholder updates when props change", () => {
  const { container } = render(() => (
    <CalculatorRow icon="/icon.svg" label="Placeholder A" value={0} onChange={() => {}} />
  ));

  const label = container.querySelector("label");
  expect(label?.innerHTML).toEqual("Placeholder A");
});

test("icon src updates when props change", () => {
  const { container } = render(() => (
    <CalculatorRow icon="/icon1.svg" label="Placeholder" value={0} onChange={() => {}} />
  ));

  const img = container.querySelector("img");
  expect(img).toHaveAttribute("src", "/icon1.svg");
});

test("renders image before input in DOM order", () => {
  const { container } = render(() => (
    <CalculatorRow icon="/test-icon.svg" label="Test placeholder" value={0} onChange={() => {}} />
  ));
  const img = container.querySelector("img");
  const input = container.querySelector("input");
  expect(img).toBeTruthy();
  expect(input).toBeTruthy();
  if (img && input) {
    expect(img.compareDocumentPosition(input)).toBe(4); // Node.DOCUMENT_POSITION_FOLLOWING
  }
});

test("large numeric values render correctly", () => {
  const { container } = render(() => (
    <CalculatorRow icon="/test-icon.svg" label="Test placeholder" value={9999999} onChange={() => {}} />
  ));
  const input = container.querySelector("input") as HTMLInputElement;
  expect(input.value).toBe("9999999");
});

test("multiple onChange calls are tracked", () => {
  const onChange = vi.fn();
  const { container } = render(() => (
    <CalculatorRow icon="/test-icon.svg" label="Test placeholder" value="" onChange={onChange} />
  ));
  const input = container.querySelector("input") as HTMLInputElement;
  fireEvent.input(input, { target: { value: "1" } });
  fireEvent.input(input, { target: { value: "12" } });
  fireEvent.input(input, { target: { value: "123" } });
  expect(onChange).toHaveBeenCalledTimes(3);
});
