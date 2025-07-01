import { TurboFactory, ArweaveSigner } from "@ardrive/turbo-sdk/web";

const clientUploadToArweave = async (
  file: File,
  getProgress: (progress: number) => void = () => {},
): Promise<string> => {
  // Decode base64 JWK for web environment
  const base64Key = process.env.NEXT_PUBLIC_ARWEAVE_KEY as string;
  const keyString = atob(base64Key);
  const ARWEAVE_KEY = JSON.parse(keyString);

  // Create signer and authenticated Turbo client using the web-specific pattern
  const signer = new ArweaveSigner(ARWEAVE_KEY);
  const turbo = TurboFactory.authenticated({ signer });

  try {
    const result = await turbo.uploadFile({
      file,
      events: {
        onUploadProgress: ({ totalBytes, processedBytes }: { totalBytes: number; processedBytes: number }) => {
          const progress = Math.round((processedBytes / totalBytes) * 100);
          getProgress(progress);
        },
        onUploadError: (error: any) => {
          console.error("Upload failed:", error);
          throw error;
        },
        onUploadSuccess: () => {
          console.log("Upload completed successfully");
        },
      },
    });

    return `ar://${result.id}`;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export default clientUploadToArweave;
