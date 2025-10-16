import { Address } from "viem";
import { REFERRAL_RECIPIENT } from "@/lib/consts";
import getSalesConfig from "@/lib/zora/getSalesConfig";
import useCreateMetadata from "@/hooks/useCreateMetadata";
import getSaleConfigType from "@/lib/getSaleConfigType";
import useCreateAdvancedValues from "./useCreateAdvancedValues";
import { useUserProvider } from "@/providers/UserProvider";

const useZoraCreateParameters = (collection?: Address) => {
  const { artistWallet, connectedAddress } = useUserProvider();
  const createMetadata = useCreateMetadata();
  const advancedValues = useCreateAdvancedValues();

  // Use priceUnit to determine if USDC
  const isUsdc = createMetadata.priceUnit === "usdc";

  const fetchParameters = async () => {
    const cc0MusicArweaveUri = await createMetadata.getUri();
    if (!createMetadata.name) return;
    const salesConfig = getSalesConfig(
      getSaleConfigType(isUsdc ? "erc20Mint" : "fixedPrice"),
      createMetadata.price,
      advancedValues.startDate
    );

    if (collection) {
      return {
        contractAddress: collection,
        token: {
          tokenMetadataURI: cc0MusicArweaveUri,
          createReferral: REFERRAL_RECIPIENT,
          salesConfig,
          mintToCreatorCount: 1,
        },
        account: (artistWallet || connectedAddress) as Address,
      };
    } else {
      return {
        contract: {
          name: createMetadata.name,
          uri: cc0MusicArweaveUri,
        },
        token: {
          tokenMetadataURI: cc0MusicArweaveUri,
          createReferral: REFERRAL_RECIPIENT,
          salesConfig,
          mintToCreatorCount: 1,
        },
        account: (artistWallet || connectedAddress) as Address,
      };
    }
  };

  return { createMetadata, fetchParameters, advancedValues };
};

export default useZoraCreateParameters;
