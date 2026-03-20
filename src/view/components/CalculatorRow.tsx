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
    <div class="flex gap-2 h-14">
      <img src={props.icon} class="h-full aspect-square object-cover flex-shrink-0" />
      <div class="relative w-full">
        <input
          // use "tel" to force mobile phones to use numpad, but not have the wonky html5 number api
          type="tel"
          autocomplete="off"
          placeholder=" "
          class="input w-full h-full px-4 pt-2 pb-1 text-base font-bold peer"
          value={props.value}
          onInput={handleInput}
        />
        <label class="absolute left-4 top-1/2 -translate-y-1/2 text-base font-bold text-gray-400 pointer-events-none transition-all duration-200 peer-focus:top-1 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-gray-600 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-gray-600">
          {props.placeholder}
        </label>
      </div>
    </div>
  );
};
