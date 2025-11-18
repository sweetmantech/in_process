import { Address } from "viem";
import { REFERRAL_RECIPIENT } from "@/lib/consts";
import getSalesConfig from "@/lib/zora/getSalesConfig";
import getSaleConfigType from "@/lib/getSaleConfigType";
import { useUserProvider } from "@/providers/UserProvider";
import { useMomentCreateFormProvider } from "@/providers/MomentCreateProviderWrapper/MomentCreateFormProvider";
import { useMomentMetadataProvider } from "@/providers/MomentCreateProviderWrapper/MomentMetadataProvider";

const useMomentCreateParameters = () => {
  const { artistWallet } = useUserProvider();
  const { form, priceUnit, price, startDate, name } = useMomentCreateFormProvider();
  const { getUri } = useMomentMetadataProvider();

  // Use priceUnit to determine if USDC
  const isUsdc = priceUnit === "usdc";
  const fetchParameters = async (collection: Address | undefined) => {
    const momentMetadataUri = await getUri();
    if (!name) return;
    const salesConfig = getSalesConfig(
      getSaleConfigType(isUsdc ? "erc20Mint" : "fixedPrice"),
      price,
      startDate
    );

    const formSplits = form.getValues("splits");
    const splitsData = formSplits && formSplits.length > 0 ? formSplits : undefined;

    if (collection) {
      return {
        contractAddress: collection,
        token: {
          tokenMetadataURI: momentMetadataUri,
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
          name: name,
          uri: momentMetadataUri,
        },
        token: {
          tokenMetadataURI: momentMetadataUri,
          createReferral: REFERRAL_RECIPIENT,
          salesConfig,
          mintToCreatorCount: 1,
        },
        account: artistWallet as Address,
        ...(splitsData && { splits: splitsData }),
      };
    }
  };

  return { fetchParameters };
};

export default useMomentCreateParameters;
