import { MessageSendResponse } from "telnyx/resources/messages/messages.mjs";
import client from "../telnyx/client";
import { TELNYX_MESSAGING_PROFILE_ID } from "../consts";

export async function sendSms(phoneNumber: string, message: string): Promise<MessageSendResponse> {
  try {
    const response = await client.messages.send({
      to: phoneNumber,
      text: message,
      type: "SMS" as const,
      messaging_profile_id: TELNYX_MESSAGING_PROFILE_ID,
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
