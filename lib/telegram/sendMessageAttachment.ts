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

export const sendMessageAttachment = async (attachment: MessageAttachment): Promise<void> => {
  const { buffer, filename, mimeType, caption } = attachment;

  if (mimeType.startsWith("image/")) {
    await sendPhoto(buffer, caption);
  } else if (mimeType.startsWith("video/")) {
    await sendVideo(buffer, caption);
  } else {
    await sendDocument(buffer, filename || "attachment", caption);
  }
};
