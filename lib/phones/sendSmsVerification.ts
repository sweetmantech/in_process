/**
 * Sends SMS verification code to a phone number.
 * Uses Twilio to send the verification SMS.
 *
 * @param phoneNumber - The phone number to send verification to (E.164 format)
 * @param verificationCode - The verification code to send
 * @returns Promise that resolves when SMS is sent
 */
export async function sendSmsVerification(
  phoneNumber: string,
  verificationCode: string
): Promise<void> {
  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

  // If Twilio is not configured, log and skip (for development)
  if (!twilioAccountSid || !twilioAuthToken || !twilioPhoneNumber) {
    console.warn(
      "Twilio not configured. SMS verification skipped.",
      `Would send code ${verificationCode} to ${phoneNumber}`
    );
    return;
  }

  const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;

  const messageBody = `Your verification code is: ${verificationCode}`;

  const response = await fetch(twilioUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${twilioAccountSid}:${twilioAuthToken}`)}`,
    },
    body: new URLSearchParams({
      From: twilioPhoneNumber,
      To: phoneNumber,
      Body: messageBody,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send SMS: ${error}`);
  }
}
