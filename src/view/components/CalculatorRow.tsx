import { ChangeEventHandler } from "react";

import { UserEnteredNumber } from "../../@types/UserEnteredNumber.mts";
import { sanitize } from "../../util/sanitize.mts";

interface CalculatorRowProps {
  icon: string;
  alt: string;
  label: string;
  value: UserEnteredNumber;
  onChange: (value: UserEnteredNumber) => void;
}

export function CalculatorRow(props: CalculatorRowProps): React.JSX.Element {
  const handleInput: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = ({
    currentTarget,
  }) => {
    const sanitized = sanitize(currentTarget.value);
    // Update the input immediately to provide instant feedback
    currentTarget.value = String(sanitized);
    // Notify parent with sanitized value
    props.onChange(sanitized);
  };

  return (
    <div className="flex h-14 gap-2">
      <img
        src={props.icon}
        className="aspect-square h-full shrink-0 object-cover"
        alt={props.alt}
      />
      <div className="relative w-full">
        <input
          type="text"
          autoComplete="off"
          inputMode="decimal"
          placeholder=" "
          className="peer size-full rounded-sm border bg-white/50 px-4 pt-2 pb-1 font-bold"
          value={props.value}
          onChange={handleInput}
          aria-label={props.label}
        />
        <label className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 font-bold transition-all duration-200 peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-semibold peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-semibold">
          {props.label}
        </label>
      </div>
    </div>
  );
}
