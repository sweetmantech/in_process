import turboClient from "./client";

export type UploadFileResult = {
  arweave_uri: string;
  winc_cost: string;
};

export const uploadFile = async (
  file: File,
  getProgress: (progress: number) => void = () => {}
): Promise<UploadFileResult> => {
  const uint8Array = new Uint8Array(await file.arrayBuffer());

  const { id, winc } = await turboClient.uploadFile({
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

  return { arweave_uri: `ar://${id}`, winc_cost: winc };
};
