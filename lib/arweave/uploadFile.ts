import turboClient from "./client";
import { getUploadTransactionId } from "./getUploadTransactionId";

export const uploadFile = async (
  file: File,
  getProgress: (progress: number) => void = () => {}
): Promise<string> => {
  const uint8Array = new Uint8Array(await file.arrayBuffer());

  const result = await turboClient.uploadFile({
    fileStreamFactory: () => Buffer.from(uint8Array),
    fileSizeFactory: () => file.size,
    dataItemOpts: {
      tags: [
        { name: "Content-Type", value: file.type || "application/octet-stream" },
        { name: "File-Name", value: file.name },
      ],
    },
    events: {
      onProgress: ({ totalBytes, processedBytes }) => {
        getProgress(Math.round((processedBytes / totalBytes) * 100));
      },
    },
  });

  const id = getUploadTransactionId(result);
  if (!id) {
    throw new Error(`Arweave upload did not return a transaction id: ${JSON.stringify(result)}`);
  }

  return `ar://${id}`;
};
