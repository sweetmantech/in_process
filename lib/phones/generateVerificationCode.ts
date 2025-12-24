/**
 * Generates a random 6-digit verification code.
 * @returns A 6-digit string code (e.g., "123456")
 */
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
