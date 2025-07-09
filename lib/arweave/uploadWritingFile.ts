import clientUploadToArweave from "./clientUploadToArweave";

export const uploadWritingFile = async (content: string) => {
  const blob = new Blob([content], { type: "text/plain" });
  const writingFile = new File([blob], "writing.txt", { type: "text/plain" });
  const uri = await clientUploadToArweave(writingFile);
  return uri;
};
