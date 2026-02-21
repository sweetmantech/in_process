import { TurboFactory } from "@ardrive/turbo-sdk/web";

const uploadToArweave = async (
  file: File,
  getProgress: (progress: number) => void = () => {}
): Promise<string> => {
  const ARWEAVE_KEY = JSON.parse(
    Buffer.from(process.env.NEXT_PUBLIC_ARWEAVE_KEY as string, "base64").toString()
  );

  const turbo = TurboFactory.authenticated({ privateKey: ARWEAVE_KEY });

  const fileBuffer = Buffer.from(await file.arrayBuffer());

  const result = await turbo.uploadFile({
    fileStreamFactory: () => fileBuffer,
    fileSizeFactory: () => file.size,
    dataItemOpts: {
      tags: [{ name: "Content-Type", value: file.type }],
    },
    events: {
      onProgress: ({ totalBytes, processedBytes }) => {
        getProgress(Math.round((processedBytes / totalBytes) * 100));
      },
    },
  });

  return `ar://${result.id}`;
};

export default uploadToArweave;
