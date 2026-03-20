import { type UserEnteredNumber } from "./UserEnteredNumber.mts";
import { Locale } from "../paraglide/runtime";

export interface State {
  locale: Locale;
  crystals: UserEnteredNumber;
  tickets: UserEnteredNumber;
  tenPartTickets: UserEnteredNumber;
  sparks: UserEnteredNumber;
}
