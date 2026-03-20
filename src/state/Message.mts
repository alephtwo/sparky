import { UserEnteredNumber } from "../@types/UserEnteredNumber.mts";
import { Locale } from "../paraglide/runtime";

export type Message =
  | { action: "set-crystals"; value: UserEnteredNumber }
  | { action: "set-tickets"; value: UserEnteredNumber }
  | { action: "set-ten-part-tickets"; value: UserEnteredNumber }
  | { action: "set-sparks"; value: UserEnteredNumber }
  | { action: "set-locale"; value: Locale };
