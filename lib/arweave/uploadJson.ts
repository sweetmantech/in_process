import { uploadViaApi, type UploadResult } from "./uploadViaApi";

export async function uploadJson(
  json: object,
  authHeaders: HeadersInit,
  getRecaptchaToken: () => Promise<string | undefined>
): Promise<UploadResult> {
  const jsonString = JSON.stringify(json);
  const file = new File([jsonString], "upload.json", { type: "application/json" });
  return uploadViaApi(file, authHeaders, getRecaptchaToken);
}
