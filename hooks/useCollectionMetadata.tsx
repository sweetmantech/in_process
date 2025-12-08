import { useCollectionFormProvider } from "@/providers/CollectionFormProvider";
import { usePrivy } from "@privy-io/react-auth";
import { buildMetadataPayload } from "@/lib/metadata/buildMetadataPayload";

const useCollectionMetadata = () => {
  const { getAccessToken } = usePrivy();
  const { name, description } = useCollectionFormProvider();

  const generateMetadataUri = async (): Promise<string> => {
    if (!name) {
      throw new Error("Collection name is required");
    }

    // For collections, we use simpler metadata - just name, description, and image
    // If there's an existing image in metadata, we preserve it, otherwise use empty string
    const image = ""; // Collections typically don't have image uploads in the update flow
    const animationUrl = "";
    const mime = "";
    const contentUri = "";
    const externalUrl = "";

    // Build and upload metadata payload
    const metadataUri = await buildMetadataPayload(
      name,
      description || "",
      externalUrl,
      image,
      animationUrl,
      mime,
      contentUri
    );

    return metadataUri;
  };

  return {
    generateMetadataUri,
  };
};

export default useCollectionMetadata;
