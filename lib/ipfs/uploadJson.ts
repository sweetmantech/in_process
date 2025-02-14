import { uploadFile } from "./uploadFile";

export async function uploadJson(json: object): Promise<string> {
  const jsonString = JSON.stringify(json);
  const file = new File([jsonString], "upload.json", {
    type: "application/json",
  });
  return await uploadFile(file);
}
