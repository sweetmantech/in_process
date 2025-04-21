import { getPublicClient } from "@/lib/viem/publicClient";
import { useTokensProvider } from "@/providers/TokensProvider";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { useEffect, useState } from "react";

const useCollection = () => {
  const { collection, chainId } = useTokensProvider();
  const [contractURI, setContractURI] = useState<string>("");

  useEffect(() => {
    const init = async () => {
      const publicClient = getPublicClient(chainId);
      const uri = await publicClient.readContract({
        address: collection,
        abi: zoraCreator1155ImplABI,
        functionName: "contractURI",
      });

      setContractURI(uri as string);
    };
    if (collection && chainId) init();
  }, [collection, chainId]);

  return {
    contractURI,
  };
};

export default useCollection;
