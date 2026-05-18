import { upload } from "@vercel/blob/client";
import { IN_PROCESS_API } from "@/lib/consts";

export const uploadToBlob = async (file: File, authHeaders: HeadersInit): Promise<string> => {
  const ext = file.name.split(".").pop();
  const pathname = ext ? `${crypto.randomUUID()}.${ext}` : crypto.randomUUID();

  const { url } = await upload(pathname, file, {
    access: "private",
    handleUploadUrl: `${IN_PROCESS_API}/blob`,
    headers: authHeaders as Record<string, string>,
  });
  console.log("🗂️ Temporary Blob URL Received:", url);
  return url;
};
