import { uploadWritingFile } from "@/lib/arweave/uploadWritingFile";
import { generateAndUploadPreview } from "@/lib/writing/generateAndUploadPreview";
import logArweaveUpload from "@/lib/arweave/logArweaveUpload";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useUserProvider } from "@/providers/UserProvider";

const useWriting = () => {
  const { writingText } = useMetadataFormProvider();
  const { getAuthHeaders } = useUserProvider();

  const uploadWriting = async () => {
    const [writingResult, previewResult, authHeaders] = await Promise.all([
      uploadWritingFile(writingText),
      generateAndUploadPreview(writingText),
      getAuthHeaders(),
    ]);

    logArweaveUpload(writingResult, authHeaders);
    if (previewResult) logArweaveUpload(previewResult, authHeaders);

    return {
      mime: "text/plain" as const,
      animationUrl: writingResult.arweave_uri,
      contentUri: writingResult.arweave_uri,
      image: previewResult?.arweave_uri ?? "",
    };
  };

  return { uploadWriting };
};

export default useWriting;
