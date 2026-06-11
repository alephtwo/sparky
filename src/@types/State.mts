import { Locale } from "../paraglide/runtime";
import { type UserEnteredNumber } from "./UserEnteredNumber.mts";

export interface State {
  locale: Locale;
  crystals: UserEnteredNumber;
  tickets: UserEnteredNumber;
  tenPartTickets: UserEnteredNumber;
  sparks: UserEnteredNumber;
}
