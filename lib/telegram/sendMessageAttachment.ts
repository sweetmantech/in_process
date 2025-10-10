import { sendMessage } from "./sendMessage";
import { sendPhoto, sendDocument, sendVideo } from "./sendMedia";

export interface MessageAttachment {
  buffer: Buffer;
  filename?: string;
  mimeType: string;
  caption: string;
}

export const sendMessageWithAttachment = async (attachment: MessageAttachment): Promise<void> => {
  const { buffer, filename, mimeType, caption } = attachment;

  if (mimeType.startsWith("image/")) {
    await sendPhoto(buffer, caption);
  } else if (mimeType.startsWith("video/")) {
    await sendVideo(buffer, caption);
  } else {
    await sendDocument(buffer, filename || "attachment", caption);
  }
};

export const sendMessageOrAttachment = async (
  message: string,
  attachment?: MessageAttachment
): Promise<void> => {
  if (attachment) {
    await sendMessageWithAttachment(attachment);
  } else {
    await sendMessage(message);
  }
};
