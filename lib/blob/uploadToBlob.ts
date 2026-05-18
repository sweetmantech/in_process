import { upload } from "@vercel/blob/client";
import { IN_PROCESS_API } from "@/lib/consts";

export const uploadToBlob = async (
  file: File,
  authHeaders: HeadersInit,
  getRecaptchaToken: () => Promise<string | undefined>
): Promise<string> => {
  const ext = file.name.split(".").pop();
  const pathname = ext ? `${crypto.randomUUID()}.${ext}` : crypto.randomUUID();
  const recaptchaToken = await getRecaptchaToken();
  const headers = {
    ...(authHeaders as Record<string, string>),
    ...(recaptchaToken && { "X-Recaptcha-Token": recaptchaToken }),
  };
  const { url } = await upload(pathname, file, {
    access: "private",
    handleUploadUrl: `${IN_PROCESS_API}/blob`,
    headers,
  });
  console.log("🗂️ Temporary Blob URL Received:", url);
  return url;
};
