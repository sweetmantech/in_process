import { createCreatorClient } from "@/lib/protocolSdk";
import { Address } from "viem";
import { CHAIN_ID, REFERRAL_RECIPIENT } from "@/lib/consts";
import { useAccount, usePublicClient } from "wagmi";
import getSalesConfig from "@/lib/zora/getSalesConfig";
import useCreateMetadata from "@/hooks/useCreateMetadata";
import useConnectedWallet from "./useConnectedWallet";
import { useFrameProvider } from "@/providers/FrameProvider";
import getSaleConfigType from "@/lib/getSaleConfigType";
import { usePathname } from "next/navigation";

const useZoraCreateParameters = (
  chainId: number = CHAIN_ID,
  collection?: Address,
) => {
  const pathname = usePathname();
  const isUsdc = pathname.includes("/usdc");
  const publicClient = usePublicClient();
  const { connectedWallet } = useConnectedWallet();
  const { address } = useAccount();
  const createMetadata = useCreateMetadata();
  const { context } = useFrameProvider();

  const fetchParameters = async () => {
    if (!publicClient) return;
    const creator = context ? address : connectedWallet;

    const creatorClient = createCreatorClient({ chainId, publicClient });
    const cc0MusicArweaveUri = await createMetadata.getUri();
    if (!createMetadata.name) return;
    const salesConfig = getSalesConfig(
      getSaleConfigType(isUsdc ? "erc20Mint" : "fixedPrice"),
      createMetadata.price,
    );

    let newParameters;
    if (collection) {
      const { parameters: existingParameters } =
        await creatorClient.create1155OnExistingContract({
          contractAddress: collection,
          token: {
            tokenMetadataURI: cc0MusicArweaveUri,
            createReferral: REFERRAL_RECIPIENT,
            salesConfig,
          },
          account: creator as Address,
        });
      newParameters = existingParameters;
    } else {
      const { parameters: newContractParameters } =
        await creatorClient.create1155({
          contract: {
            name: createMetadata.name,
            uri: cc0MusicArweaveUri,
          },
          token: {
            tokenMetadataURI: cc0MusicArweaveUri,
            createReferral: REFERRAL_RECIPIENT,
            salesConfig,
          },
          account: creator as Address,
        });
      newParameters = {
        ...newContractParameters,
        functionName: "createContract",
      };
    }

    return newParameters;
  };

  return { createMetadata, fetchParameters };
};

export default useZoraCreateParameters;
