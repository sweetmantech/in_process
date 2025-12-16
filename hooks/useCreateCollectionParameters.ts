import { Address } from "viem";
import { useUserProvider } from "@/providers/UserProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useMetadataUploadProvider } from "@/providers/MetadataUploadProvider";

const useCreateCollectionParameters = () => {
  const { artistWallet } = useUserProvider();
  const { name } = useMetadataFormProvider();
  const { generateMetadataUri } = useMetadataUploadProvider();

  const fetchParameters = async () => {
    const metadataUri = await generateMetadataUri();
    if (!name || !artistWallet) return;

    return {
      account: artistWallet as Address,
      uri: metadataUri,
      name,
    };
  };

  return { fetchParameters };
};

export default useCreateCollectionParameters;
