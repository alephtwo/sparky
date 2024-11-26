import { produce } from "immer";
import * as React from "react";
import { useReducer } from "react";

export function Sparky() {
  const [state, dispatch] = useReducer(reducer, intitialState);

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        value={state.crystals}
        onChange={(e) => {
          dispatch({ action: "update-crystals", value: sanitize(e.target.value) });
        }}
      />
      <input
        type="text"
        value={state.tickets}
        onChange={(e) => {
          dispatch({ action: "update-tickets", value: sanitize(e.target.value) });
        }}
      />
      <input
        type="text"
        value={state.tenPartTickets}
        onChange={(e) => {
          dispatch({ action: "update-ten-part-tickets", value: sanitize(e.target.value) });
        }}
      />
      <input
        type="text"
        value={state.ceruleanSparks}
        onChange={(e) => {
          dispatch({ action: "update-cerulean-sparks", value: sanitize(e.target.value) });
        }}
      />
    </div>
  );
}

type UserEnteredNumber = number | "";

interface State {
  crystals: UserEnteredNumber;
  tickets: UserEnteredNumber;
  tenPartTickets: UserEnteredNumber;
  ceruleanSparks: UserEnteredNumber;
}

const intitialState: State = {
  crystals: "",
  tickets: "",
  tenPartTickets: "",
  ceruleanSparks: "",
};

type Message =
  | { action: "update-crystals"; value: UserEnteredNumber }
  | { action: "update-tickets"; value: UserEnteredNumber }
  | { action: "update-ten-part-tickets"; value: UserEnteredNumber }
  | { action: "update-cerulean-sparks"; value: UserEnteredNumber };

function reducer(state: State, message: Message): State {
  switch (message.action) {
    case "update-crystals":
      return produce(state, (next) => {
        next.crystals = message.value;
      });
    case "update-tickets":
      return produce(state, (next) => {
        next.tickets = message.value;
      });
    case "update-ten-part-tickets":
      return produce(state, (next) => {
        next.tenPartTickets = message.value;
      });
    case "update-cerulean-sparks":
      return produce(state, (next) => {
        next.ceruleanSparks = message.value;
      });
    default:
      return state;
  }
}

function sanitize(input: string): UserEnteredNumber {
  // Ensure we're only looking at numbers, and at most six of them.
  const onlyDigits = input.replace(/[^\d]/, "").substring(0, 6);
  const attempt = parseInt(onlyDigits);
  if (isNaN(attempt)) {
    return "";
  }
  return attempt;
}
