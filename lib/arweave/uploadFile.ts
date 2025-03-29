import { upload } from "@vercel/blob/client";

export const uploadFile = async (file: File): Promise<string> => {
  try {
    const newBlob = await upload(file.name, file, {
      access: "public",
      handleUploadUrl: "/api/arweave/vercel-blob",
    });
    console.log("ziad", newBlob);
    return "";
  } catch (error) {
    console.error(error);
    return "";
  }
};
