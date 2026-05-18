import { IN_PROCESS_API } from "@/lib/consts";
import { uploadToBlob } from "@/lib/blob/uploadToBlob";

export type UploadResult = {
  arweave_uri: string;
};

export const uploadViaApi = async (
  file: File,
  authHeaders: HeadersInit,
  getRecaptchaToken: () => Promise<string | undefined>
): Promise<UploadResult> => {
  const blobUrl = await uploadToBlob(file, authHeaders, getRecaptchaToken);

  const uploadToken = await getRecaptchaToken();
  const uploadHeaders = {
    "Content-Type": "application/json",
    ...(authHeaders as Record<string, string>),
    ...(uploadToken && { "X-Recaptcha-Token": uploadToken }),
  };
  const response = await fetch(`${IN_PROCESS_API}/upload`, {
    method: "POST",
    headers: uploadHeaders,
    body: JSON.stringify({ url: blobUrl }),
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  const { uri } = await response.json();
  console.log("🌐 Final Arweave URI Received:", uri);
  return { arweave_uri: uri };
};
