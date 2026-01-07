/**
 * Normalizes a US phone number to E.164 format (+1XXXXXXXXXX).
 * If country code is not provided, assumes USA (+1).
 *
 * Valid formats:
 * - "+1 270 1240 2354" -> "+127012402354"
 * - "914 202 2503" -> "+19142022503"
 * - "555-123-4567" -> "+15551234567"
 * - "+12704431235" -> "+12704431235"
 * - "2704431235" -> "+12704431235"
 *
 * Invalid formats:
 * - "+44 20 7123 4567" (non-US country code)
 * - "123" (too short)
 *
 * @param phoneNumber - The phone number to normalize
 * @returns The normalized phone number in E.164 format (+1XXXXXXXXXX)
 * @throws Error if the phone number is invalid or not a US number
 */
export function normalizeUsPhoneNumber(phoneNumber: string): string {
  // Remove all whitespace, dashes, and parentheses
  const cleaned = phoneNumber.replace(/[\s\-()]/g, "");

  // Check if it starts with a country code
  let digits: string;
  if (cleaned.startsWith("+")) {
    // Has country code prefix
    if (cleaned.startsWith("+1")) {
      // US number with +1 prefix
      digits = cleaned.slice(2); // Remove +1
      // If there are 11 digits, take the last 10 (handles cases like +1 270 1240 2354)
      if (digits.length === 11) {
        digits = digits.slice(-10);
      }
    } else {
      // Non-US country code
      throw new Error(
        "Only US phone numbers are supported. Please use a US number with country code +1 or without country code."
      );
    }
  } else if (cleaned.startsWith("1") && cleaned.length === 11) {
    // US number starting with 1 (11 digits total)
    digits = cleaned.slice(1); // Remove leading 1
  } else {
    // Assume US number without country code
    digits = cleaned;
  }

  // Validate: must be exactly 10 digits
  if (!/^\d{10}$/.test(digits)) {
    throw new Error(
      "Phone number must be 10 digits (US format). Example: +1 270 1240 2354 or 2704431235"
    );
  }

  // Return in E.164 format
  return `+1${digits}`;
}
