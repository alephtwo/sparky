import { Component } from "solid-js";
import { UserEnteredNumber } from "../../@types/UserEnteredNumber.mts";
import { sanitize } from "../../util/sanitize.mts";

interface CalculatorRowProps {
  icon: string;
  placeholder: string;
  value: UserEnteredNumber;
  onChange: (value: UserEnteredNumber) => void;
}

export const CalculatorRow: Component<CalculatorRowProps> = (props) => {
  const handleInput = (e: Event) => {
    const input = e.currentTarget as HTMLInputElement;
    const sanitized = sanitize(input.value);
    // Update the input immediately to provide instant feedback
    input.value = String(sanitized);
    // Notify parent with sanitized value
    props.onChange(sanitized);
  };

  return (
    <div class="flex gap-2 max-h-14">
      <img src={props.icon} />
      <input
        // use "tel" to force mobile phones to use numpad, but not have the wonky html5 number api
        type="tel"
        autocomplete="off"
        placeholder={props.placeholder}
        class="input input-xl w-full text-sm font-bold"
        value={props.value}
        onInput={handleInput}
      />
    </div>
  );
};
