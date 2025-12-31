/**
 * Validates and trims a phone number in E.164 format.
 *
 * @param phoneNumber - The phone number to validate
 * @returns The trimmed phone number if valid
 * @throws Error if the phone number is not in valid E.164 format
 */
export function validatePhoneNumber(phoneNumber: string): string {
  const trimmedPhoneNumber = phoneNumber.trim();
  const e164Regex = /^\+[1-9]\d{1,14}$/;

  if (!e164Regex.test(trimmedPhoneNumber)) {
    throw new Error("phone_number must be in E.164 format (e.g., +1234567890)");
  }

  return trimmedPhoneNumber;
}
