import { Component } from "solid-js";

import { UserEnteredNumber } from "../../@types/UserEnteredNumber.mts";
import { sanitize } from "../../util/sanitize.mts";

interface CalculatorRowProps {
  icon: string;
  alt: string;
  label: string;
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
    <div class="flex h-14 gap-2">
      <img src={props.icon} class="aspect-square h-full shrink-0 object-cover" alt={props.alt} />
      <div class="relative w-full">
        <input
          type="text"
          autocomplete="off"
          inputmode="decimal"
          placeholder=" "
          class="input peer h-full w-full px-4 pt-2 pb-1 text-base font-bold"
          value={props.value}
          onInput={handleInput}
          aria-label={props.label}
        />
        <label class="text-base-content/40 peer-focus:text-base-content/60 peer-[:not(:placeholder-shown)]:text-base-content/60 pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-base font-bold transition-all duration-200 peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-semibold peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold">
          {props.label}
        </label>
      </div>
    </div>
  );
};
