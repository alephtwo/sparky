import { UserEnteredNumber } from "../@types/UserEnteredNumber.mts";

export function sanitize(input: string): UserEnteredNumber {
  // Ensure we're only looking at numbers, and at most six of them.
  const onlyDigits = input.replace(/\D/g, "").substring(0, 6);
  const attempt = parseInt(onlyDigits);
  if (isNaN(attempt)) {
    return "";
  }
  return attempt;
}
