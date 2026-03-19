import { produce } from "immer";
import { type Message } from "./Message.mts";
import { type UserEnteredNumber } from "../@types/UserEnteredNumber.mts";
import { getLocale, Locale, locales } from "../paraglide/runtime";

export interface State {
  locale: Locale;
  crystals: UserEnteredNumber;
  tickets: UserEnteredNumber;
  tenPartTickets: UserEnteredNumber;
  sparks: UserEnteredNumber;
}

export const initialState: State = {
  locale: getLocale(),
  crystals: "",
  tickets: "",
  tenPartTickets: "",
  sparks: "",
};

export function reducer(state: State, message: Message) {
  switch (message.action) {
    case "set-crystals":
      return produce(state, (next) => {
        next.crystals = sanitize(message.value);
      });
    case "set-tickets":
      return produce(state, (next) => {
        next.tickets = sanitize(message.value);
      });
    case "set-ten-part-tickets":
      return produce(state, (next) => {
        next.tenPartTickets = sanitize(message.value);
      });
    case "set-sparks":
      return produce(state, (next) => {
        next.sparks = sanitize(message.value);
      });
    case "set-locale":
      return produce(state, (next) => {
        next.locale = message.value;
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
