import { Address } from "viem";
import { REFERRAL_RECIPIENT } from "@/lib/consts";
import getSalesConfig from "@/lib/zora/getSalesConfig";
import getSaleConfigType from "@/lib/getSaleConfigType";
import { useUserProvider } from "@/providers/UserProvider";
import useCreateForm from "./useCreateForm";

const useMomentCreateParameters = (collection?: Address) => {
  const { artistWallet } = useUserProvider();
  const { form, createMetadata, advancedValues } = useCreateForm();

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

    const formSplits = form.getValues("splits");
    const splitsData = formSplits && formSplits.length > 0 ? formSplits : undefined;

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

  return { createMetadata, fetchParameters, advancedValues, form };
};

export default useMomentCreateParameters;
