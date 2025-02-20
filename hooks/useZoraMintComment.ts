import { useEffect, useState } from "react";
import useBalance from "./useBalance";
import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import {
  zoraCreator1155ImplABI,
  zoraCreatorFixedPriceSaleStrategyAddress,
} from "@zoralabs/protocol-deployments";
import { CHAIN } from "@/lib/consts";
import { Address, encodeAbiParameters, parseAbiParameters } from "viem";
import { useTokenProvider } from "@/providers/TokenProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { useCrossmintCheckout } from "@crossmint/client-sdk-react-ui";

const useZoraMintComment = () => {
  const [isOpenCrossmint, setIsOpenCrossmint] = useState(false);
  const { balance } = useBalance();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const { token, comment, addComment, setComment } = useTokenProvider();
  const { email, isPrepared } = useUserProvider();
  const { order } = useCrossmintCheckout();

  const mintComment = async () => {
    try {
      if (!isPrepared()) return;
      setIsLoading(true);
      if (!publicClient || !address || email) {
        setIsOpenCrossmint(true);
        setIsLoading(false);
        return;
      }
      const hasBalanceToMint = balance > 0.000000111000000001;
      if (!hasBalanceToMint) {
        setIsLoading(false);
        setIsOpenCrossmint(true);
        return;
      }
      const minterArguments = encodeAbiParameters(
        parseAbiParameters("address, string"),
        [address, comment],
      );

      const hash = await writeContractAsync({
        address: token.token.contract.address,
        account: address,
        abi: zoraCreator1155ImplABI,
        functionName: "mint",
        args: [
          zoraCreatorFixedPriceSaleStrategyAddress[CHAIN.id],
          BigInt(token.token.tokenId),
          BigInt(1),
          [],
          minterArguments,
        ],
        value: BigInt(111000000001),
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      addComment({
        sender: address,
        comment,
        timestamp: new Date().getTime(),
      } as any);
      setComment("");
      setIsLoading(false);
      return receipt;
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      if (order?.phase !== "completed") return;
      addComment({
        sender: order.lineItems[0].delivery.recipient?.walletAddress as Address,
        comment,
        timestamp: new Date().getTime(),
      } as any);
    };
    fetchOrder();
    // eslint-disable-next-line
  }, [order]);

  return {
    mintComment,
    isOpenCrossmint,
    setIsOpenCrossmint,
    isLoading,
  };
};

export default useZoraMintComment;
