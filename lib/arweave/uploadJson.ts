import clientUploadToArweave from "./clientUploadToArweave";

export async function uploadJson(json: object): Promise<string> {
  const jsonString = JSON.stringify(json);
  const file = new File([jsonString], "upload.json", {
    type: "application/json",
  });
  const uri = await clientUploadToArweave(file);
  return uri;
}
