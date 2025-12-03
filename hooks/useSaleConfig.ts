import { useEffect, useState } from "react";
import { useMomentProvider } from "@/providers/MomentProvider";
import { Address, encodeFunctionData } from "viem";
import useSignTransaction from "./useSignTransaction";
import { getPublicClient } from "@/lib/viem/publicClient";
import { CHAIN, CHAIN_ID } from "@/lib/consts";
import {
  zoraCreator1155ImplABI,
  zoraCreatorFixedPriceSaleStrategyABI,
} from "@zoralabs/protocol-deployments";
import { zoraCreatorFixedPriceSaleStrategyAddress } from "@/lib/protocolSdk/constants";
import { useUserProvider } from "@/providers/UserProvider";

const useSaleConfig = () => {
  const { saleConfig: sale } = useMomentProvider();
  const [saleStart, setSaleStart] = useState<Date>(new Date());
  const { moment, fetchMomentData } = useMomentProvider();
  const { signTransaction } = useSignTransaction();
  const { connectedAddress } = useUserProvider();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setSale = async () => {
    if (!sale) return;
    setIsLoading(true);
    const newSale = {
      ...sale,
      saleStart: BigInt(Number(saleStart.getTime() / 1000).toFixed(0)),
      saleEnd: BigInt(sale.saleEnd),
      pricePerToken: BigInt(sale.pricePerToken),
      maxTokensPerAddress: BigInt(sale.maxTokensPerAddress),
    };
    const calldata = encodeFunctionData({
      abi: zoraCreatorFixedPriceSaleStrategyABI,
      functionName: "setSale",
      args: [BigInt(moment.tokenId), newSale],
    });
    const publicClient = getPublicClient(CHAIN_ID);
    const hash = await signTransaction({
      address: moment.collectionAddress,
      abi: zoraCreator1155ImplABI,
      functionName: "callSale",
      args: [moment.tokenId, zoraCreatorFixedPriceSaleStrategyAddress[CHAIN_ID], calldata],
      account: connectedAddress as Address,
      chain: CHAIN,
    });
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    setIsLoading(false);
    fetchMomentData();
    return receipt;
  };

  useEffect(() => {
    if (sale) {
      setSaleStart(
        BigInt(sale.saleStart) === BigInt(0)
          ? new Date()
          : new Date(parseInt(sale.saleStart.toString(), 10) * 1000)
      );
    }
  }, [sale]);

  return {
    saleStart,
    setSaleStart,
    setSale,
    isLoading,
  };
};

export default useSaleConfig;
