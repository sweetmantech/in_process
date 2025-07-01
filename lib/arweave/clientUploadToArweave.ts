import { TurboFactory } from "@ardrive/turbo-sdk/web";

const clientUploadToArweave = async (
  file: File,
  getProgress: (progress: number) => void = () => {},
): Promise<string> => {
  const ARWEAVE_KEY = JSON.parse(
    Buffer.from(
      process.env.NEXT_PUBLIC_ARWEAVE_KEY as string,
      "base64",
    ).toString(),
  );

  // Create authenticated Turbo client
  const turbo = TurboFactory.authenticated({
    privateKey: ARWEAVE_KEY,
  });

  try {
    const result = await turbo.uploadFile({
      file,
      events: {
        onUploadProgress: ({ totalBytes, processedBytes }: { totalBytes: number; processedBytes: number }) => {
          const progress = Math.round((processedBytes / totalBytes) * 100);
          getProgress(progress);
        },
        onUploadError: (error: Error) => {
          console.error("Upload error:", error);
          throw error;
        },
      },
    });

    return `ar://${result.id}`;
  } catch (error) {
    console.error("Failed to upload to Arweave via Turbo:", error);
    throw error;
  }
};

export default clientUploadToArweave;
