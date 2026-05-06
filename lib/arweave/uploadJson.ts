import uploadToArweave from "./uploadToArweave";

export async function uploadJson(json: object) {
  const jsonString = JSON.stringify(json);
  const file = new File([jsonString], "upload.json", { type: "application/json" });
  return uploadToArweave(file);
}
