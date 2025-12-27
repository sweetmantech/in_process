import { MessageSendResponse } from "telnyx/resources/messages/messages.mjs";
import client from "../telnyx/client";
import { TELNYX_MESSAGING_PROFILE_ID, TELNYX_PHONE_NUMBER } from "../consts";

/**
 * Sends SMS verification message to a phone number using Telnyx API.
 *
 * For international SMS, this ensures we use a phone number (long code) instead of
 * a short code, which allows recipients to reply to the message.
 *
 * IMPORTANT: To enable replies for international SMS:
 * 1. Configure a messaging profile in Telnyx that uses a phone number (not a short code)
 * 2. Set TELNYX_MESSAGING_PROFILE_ID environment variable to that profile ID
 * 3. Alternatively, ensure TELNYX_PHONE_NUMBER is configured to support international messaging
 *    without using a messaging profile that routes to short codes
 *
 * @param phoneNumber - The phone number to send verification to (E.164 format, e.g., "+15551234567")
 * @param artistName - The name of the artist to include in the message
 * @returns Promise that resolves when SMS is sent
 */
export async function sendSmsVerification(
  phoneNumber: string,
  artistName: string
): Promise<MessageSendResponse> {
  try {
    const messageText = `Someone is trying to connect this phone number to the artist profile for ${artistName} on In Process. If this was you, please reply 'yes'. If this was not you, please ignore this message.`;

    const response = await client.messages.send({
      from: TELNYX_PHONE_NUMBER,
      to: phoneNumber,
      text: messageText,
      messaging_profile_id: TELNYX_MESSAGING_PROFILE_ID,
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
