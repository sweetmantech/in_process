import turboClient from "./client";

export const uploadFile = async (
  file: File,
  getProgress: (progress: number) => void = () => {}
): Promise<string> => {
  const uint8Array = new Uint8Array(await file.arrayBuffer());

  const { id } = await turboClient.uploadFile({
    fileStreamFactory: () => Buffer.from(uint8Array),
    fileSizeFactory: () => file.size,
    dataItemOpts: {
      tags: [
        { name: "Content-Type", value: file.type },
        { name: "File-Name", value: file.name },
      ],
    },
    events: {
      onProgress: ({ totalBytes, processedBytes }) => {
        getProgress(Math.round((processedBytes / totalBytes) * 100));
      },
    },
  });

  return `ar://${id}`;
};
