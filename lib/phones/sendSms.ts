import { MessageSendResponse } from "telnyx/resources/messages/messages.mjs";
import client from "../telnyx/client";
import { TELNYX_MESSAGING_PROFILE_ID, TELNYX_PHONE_NUMBER } from "../consts";

export async function sendSms(phoneNumber: string, message: string): Promise<MessageSendResponse> {
  try {
    const response = await client.messages.send({
      from: TELNYX_PHONE_NUMBER,
      to: phoneNumber,
      text: message,
      messaging_profile_id: TELNYX_MESSAGING_PROFILE_ID,
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
