type CreateUploadUrlResponse = {
  uploadURL: string;
  uploadId: string;
};

const createUploadUrl = async (): Promise<CreateUploadUrlResponse> => {
  const response = await fetch("/api/mux/create");

  if (!response.ok) {
    throw new Error("Failed to create upload URL");
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
