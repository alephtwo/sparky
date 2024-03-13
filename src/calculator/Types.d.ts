type UserEnteredNumber = number | "";

export interface State {
  crystals: UserEnteredNumber;
  tickets: UserEnteredNumber;
  tenPartTickets: UserEnteredNumber;
  sparks: UserEnteredNumber;
}

export type Message =
  | { action: "set-crystals"; value: string }
  | { action: "set-tickets"; value: string }
  | { action: "set-ten-part-tickets"; value: string }
  | { action: "set-sparks"; value: string };
