import { Address } from "viem";
import { REFERRAL_RECIPIENT } from "@/lib/consts";
import { useAccount } from "wagmi";
import getSalesConfig from "@/lib/zora/getSalesConfig";
import useCreateMetadata from "@/hooks/useCreateMetadata";
import useConnectedWallet from "./useConnectedWallet";
import { useFrameProvider } from "@/providers/FrameProvider";
import getSaleConfigType from "@/lib/getSaleConfigType";
import { usePathname } from "next/navigation";
import useCreateAdvancedValues from "./useCreateAdvancedValues";

const useZoraCreateParameters = () => {
  const pathname = usePathname();
  const isUsdc = pathname.includes("/usdc");
  const { connectedWallet } = useConnectedWallet();
  const { address } = useAccount();
  const createMetadata = useCreateMetadata();
  const { context } = useFrameProvider();
  const advancedValues = useCreateAdvancedValues();

  const fetchParameters = async () => {
    const creator = context ? address : connectedWallet;
    const cc0MusicArweaveUri = await createMetadata.getUri();
    if (!createMetadata.name) return;
    const salesConfig = getSalesConfig(
      getSaleConfigType(isUsdc ? "erc20Mint" : "fixedPrice"),
      createMetadata.price,
      advancedValues.startDate
    );

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
      account: creator as Address,
    };
  };

  return { createMetadata, fetchParameters, advancedValues };
};

export default useZoraCreateParameters;
