import { IN_PROCESS_API } from "@/lib/consts";

type CreateUploadUrlResponse = {
  uploadURL: string;
  uploadId: string;
};

const createUploadUrl = async (accessToken: string): Promise<CreateUploadUrlResponse> => {
  const response = await fetch(`${IN_PROCESS_API}/mux/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to upload a video to mux");
  }

  const data = await response.json();

  if (!data.uploadURL) {
    throw new Error("No upload URL received");
  }

  return {
    uploadURL: data.uploadURL,
    uploadId: data.uploadId,
  };
};

export default createUploadUrl;
