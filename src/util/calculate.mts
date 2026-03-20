import { UserEnteredNumber } from "../@types/UserEnteredNumber.mts";

interface CalculateArgs {
  crystals: UserEnteredNumber;
  tickets: UserEnteredNumber;
  tenPartTickets: UserEnteredNumber;
  sparks: UserEnteredNumber;
}

export function calculate(args: CalculateArgs): number {
  return [
    Math.floor(toNumber(args.crystals) / 300),
    toNumber(args.tickets),
    toNumber(args.tenPartTickets) * 10,
    toNumber(args.sparks),
  ].reduce((a, x) => a + x, 0);
}

function toNumber(input: UserEnteredNumber): number {
  return input || 0;
}
