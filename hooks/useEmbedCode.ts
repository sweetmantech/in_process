import uploadToArweave from "@/lib/arweave/uploadToArweave";
import logArweaveUpload from "@/lib/arweave/logArweaveUpload";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useUserProvider } from "@/providers/UserProvider";

const useEmbedCode = () => {
  const { embedCode } = useMetadataFormProvider();
  const { getAuthHeaders } = useUserProvider();

  const uploadEmbedCode = async () => {
    const blob = new Blob([`<html>\n      ${embedCode}\n      </html>`], { type: "text/html" });
    const textImage = new File([blob], "embed", { type: "text/html" });
    const result = await uploadToArweave(textImage);
    const authHeaders = await getAuthHeaders();
    logArweaveUpload(result, authHeaders);
    return result.arweave_uri;
  };

  return {
    uploadEmbedCode,
  };
};

export default useEmbedCode;
