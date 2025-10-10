import { sendPhoto } from "./sendPhoto";

export interface MessageAttachment {
  buffer: Buffer;
  caption: string;
}

export interface RawMediaFile {
  arrayBuffer(): Promise<ArrayBuffer>;
  name: string;
  type: string;
}

export const sendMessageAttachment = async (attachment: MessageAttachment): Promise<void> => {
  const { buffer, caption } = attachment;
  await sendPhoto(buffer, caption);
};
