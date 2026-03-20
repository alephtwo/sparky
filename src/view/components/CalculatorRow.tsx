import * as React from "react";
import { ChangeEventHandler } from "react";
import { UserEnteredNumber } from "../../@types/UserEnteredNumber.mts";

interface CalculatorRowProps {
  icon: string;
  placeholder: string;
  value: UserEnteredNumber;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export function CalculatorRow(props: CalculatorRowProps): React.JSX.Element {
  return (
    <div className="flex gap-2 max-h-14">
      <img src={props.icon} />
      <input
        // use "tel" to force mobile phones to use numpad, but not have the wonky html5 number api
        type="tel"
        placeholder={props.placeholder}
        className="input input-xl w-full text-sm font-bold"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}
