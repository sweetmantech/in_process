import { createCreatorClient } from "@/lib/protocolSdk";
import { Address } from "viem";
import { CHAIN_ID, REFERRAL_RECIPIENT } from "@/lib/consts";
import { usePublicClient } from "wagmi";
import getSalesConfig from "@/lib/zora/getSalesConfig";
import useCreateMetadata from "@/hooks/useCreateMetadata";
import useConnectedWallet from "./useConnectedWallet";

const useZoraCreateParameters = (
  chainId: number = CHAIN_ID,
  collection?: Address,
) => {
  const publicClient = usePublicClient();
  const { connectedWallet } = useConnectedWallet();
  const createMetadata = useCreateMetadata();

  const fetchParameters = async (textRefUri: string) => {
    if (!publicClient || !connectedWallet) return;
    const creatorClient = createCreatorClient({ chainId, publicClient });
    const cc0MusicArweaveUri = await createMetadata.getUri(textRefUri);
    if (!createMetadata.name) return;
    const salesConfig = getSalesConfig(
      createMetadata.isTimedSale
        ? "ZoraTimedSaleStrategy"
        : "ZoraFixedPriceSaleStrategy",
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
          account: connectedWallet as Address,
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
          account: connectedWallet as Address,
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
