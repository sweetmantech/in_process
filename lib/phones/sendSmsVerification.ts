import { MessageSendResponse } from "telnyx/resources/messages/messages.mjs";
import client from "../telnyx/client";
import { TELNYX_PHONE_NUMBER } from "../consts";

/**
 * Sends SMS verification message to a phone number using Telnyx API.
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
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
