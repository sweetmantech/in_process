import { Address } from "viem";
import { REFERRAL_RECIPIENT } from "@/lib/consts";
import getSalesConfig from "@/lib/zora/getSalesConfig";
import useCreateMetadata from "@/hooks/useCreateMetadata";
import getSaleConfigType from "@/lib/getSaleConfigType";
import useCreateAdvancedValues from "./useCreateAdvancedValues";
import useSplits from "./useSplits";
import { useUserProvider } from "@/providers/UserProvider";

const useMomentCreateParameters = (collection?: Address) => {
  const { artistWallet } = useUserProvider();
  const createMetadata = useCreateMetadata();
  const advancedValues = useCreateAdvancedValues();
  const splits = useSplits();

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

    // Include splits in request if configured and valid
    const splitsData = splits.splits.length > 0 && splits.isValid ? splits.splits : undefined;

    if (collection) {
      return {
        contractAddress: collection,
        token: {
          tokenMetadataURI: cc0MusicArweaveUri,
          createReferral: REFERRAL_RECIPIENT,
          salesConfig,
          mintToCreatorCount: 1,
        },
        account: artistWallet as Address,
        ...(splitsData && { splits: splitsData }),
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
        account: artistWallet as Address,
        ...(splitsData && { splits: splitsData }),
      };
    }
  };

  return { createMetadata, fetchParameters, advancedValues, splits };
};

export default useMomentCreateParameters;
