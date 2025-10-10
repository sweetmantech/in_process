import { sendMessage } from "./sendMessage";
import { sendMessageAttachment, RawMediaFile } from "./sendMessageAttachment";

export const sendMessageOrAttachment = async (
  message: string,
  mediaFile?: RawMediaFile | null
): Promise<void> => {
  if (mediaFile) {
    const buffer = Buffer.from(await mediaFile.arrayBuffer());
    const attachment = {
      buffer,
      filename: mediaFile.name,
      mimeType: mediaFile.type,
      caption: message,
    };
    await sendMessageAttachment(attachment);
  } else {
    await sendMessage(message);
  }
};
