import { Locale } from "../paraglide/runtime";

export type Message =
  | { action: "set-crystals"; value: string }
  | { action: "set-tickets"; value: string }
  | { action: "set-ten-part-tickets"; value: string }
  | { action: "set-sparks"; value: string }
  | { action: "set-locale"; value: Locale };
