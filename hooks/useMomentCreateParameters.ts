import { Address } from "viem";
import { REFERRAL_RECIPIENT } from "@/lib/consts";
import getSalesConfig from "@/lib/zora/getSalesConfig";
import getSaleConfigType from "@/lib/getSaleConfigType";
import { useUserProvider } from "@/providers/UserProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useMetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import useCollectionParam from "./useCollectionParam";

const useMomentCreateParameters = () => {
  const { artistWallet, isExternalWallet } = useUserProvider();
  const { smartWallet } = useSmartWalletProvider();
  const { form, priceUnit, price, startDate, name } = useMetadataFormProvider();
  const { generateMetadataUri } = useMetadataUploadProvider();
  const collection = useCollectionParam();

  // Use priceUnit to determine if USDC
  const isUsdc = priceUnit === "usdc";
  const fetchParameters = async () => {
    const momentMetadataUri = await generateMetadataUri();
    if (!name) return;
    const salesConfig = getSalesConfig(
      getSaleConfigType(isUsdc ? "erc20Mint" : "fixedPrice"),
      price,
      startDate
    );

    const formSplits = form.getValues("splits");
    const splitsData = formSplits && formSplits.length > 0 ? formSplits : undefined;

    if (collection)
      return {
        contractAddress: collection,
        token: {
          tokenMetadataURI: momentMetadataUri,
          createReferral: REFERRAL_RECIPIENT,
          salesConfig,
          mintToCreatorCount: 1,
          payoutRecipient: isExternalWallet ? artistWallet : smartWallet,
        },
        account: artistWallet as Address,
        ...(splitsData && { splits: splitsData }),
      };

    return {
      contract: {
        name,
        uri: momentMetadataUri,
      },
      token: {
        tokenMetadataURI: momentMetadataUri,
        createReferral: REFERRAL_RECIPIENT,
        salesConfig,
        mintToCreatorCount: 1,
        payoutRecipient: isExternalWallet ? artistWallet : smartWallet,
      },
      account: artistWallet as Address,
      ...(splitsData && { splits: splitsData }),
    };
  };

  return { fetchParameters };
};

export default useMomentCreateParameters;
