import { createCreatorClient } from "@/lib/protocolSdk";
import { Address } from "viem";
import { CHAIN_ID, REFERRAL_RECIPIENT } from "@/lib/consts";
import { useAccount, usePublicClient } from "wagmi";
import getSalesConfig from "@/lib/zora/getSalesConfig";
import useCreateMetadata from "@/hooks/useCreateMetadata";

const useZoraCreateParameters = (
  chainId: number = CHAIN_ID,
  collection?: Address,
) => {
  const publicClient = usePublicClient();
  const { address } = useAccount();
  const createMetadata = useCreateMetadata();
  const createMetadataa = {
    name: "healing album image",
    isTimedSale: false,
    price: "0",
  };

  const fetchParameters = async (textRefUri: string) => {
    if (!publicClient) return;
    const creatorClient = createCreatorClient({ chainId, publicClient });
    const cc0MusicArweaveUri = await createMetadata.getUri(textRefUri);
    const salesConfig = getSalesConfig(
      createMetadataa.isTimedSale
        ? "ZoraTimedSaleStrategy"
        : "ZoraFixedPriceSaleStrategy",
      createMetadataa.price,
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
          account: address as Address,
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
          account: address as Address,
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
