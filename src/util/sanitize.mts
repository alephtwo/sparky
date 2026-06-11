import { UserEnteredNumber } from "../@types/UserEnteredNumber.mts";

export function sanitize(input: string): UserEnteredNumber {
  // Ensure we're only looking at numbers, and at most six of them.
  const onlyDigits = input.replaceAll(/\D/g, "").slice(0, 6);
  const attempt = Number.parseInt(onlyDigits);
  if (Number.isNaN(attempt)) {
    return "";
  }
  return attempt;
}
