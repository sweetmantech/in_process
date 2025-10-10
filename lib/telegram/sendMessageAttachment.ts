import { sendMessage } from "./sendMessage";
import { sendPhoto } from "./sendPhoto";
import { sendDocument } from "./sendDocument";
import { sendVideo } from "./sendVideo";

export interface MessageAttachment {
  buffer: Buffer;
  filename?: string;
  mimeType: string;
  caption: string;
}

export interface RawMediaFile {
  arrayBuffer(): Promise<ArrayBuffer>;
  name: string;
  type: string;
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
  mediaFile?: RawMediaFile | null
): Promise<void> => {
  if (mediaFile) {
    const buffer = Buffer.from(await mediaFile.arrayBuffer());
    const attachment: MessageAttachment = {
      buffer,
      filename: mediaFile.name,
      mimeType: mediaFile.type,
      caption: message,
    };
    await sendMessageWithAttachment(attachment);
  } else {
    await sendMessage(message);
  }
};
