import { IN_PROCESS_API } from "@/lib/consts";

/**
 * Calls the API endpoint to verify a phone number.
 * Sends SMS verification message to the provided phone number.
 *
 * @param phoneNumber - The phone number to verify (E.164 format, e.g., "+17742052354")
 * @param accessToken - The authentication token
 * @returns Promise that resolves with the API response
 */
export async function verifyPhoneNumber(
  phoneNumber: string,
  accessToken: string
): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${IN_PROCESS_API}/phones`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      phone_number: phoneNumber,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to verify phone number");
  }

  return data;
}
