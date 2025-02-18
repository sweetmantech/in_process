import { useState } from "react";
import useBalance from "./useBalance";
import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import {
  zoraCreator1155ImplABI,
  zoraCreatorFixedPriceSaleStrategyAddress,
} from "@zoralabs/protocol-deployments";
import { CHAIN } from "@/lib/consts";
import { encodeAbiParameters, parseAbiParameters } from "viem";
import { useTokenProvider } from "@/providers/TokenProvider";

const useZoraMintComment = () => {
  const [isOpenCrossmint, setIsOpenCrossmint] = useState(false);
  const { balance } = useBalance();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const { token, comment, addComment, setComment } = useTokenProvider();

  const mintComment = async () => {
    setIsLoading(true);
    try {
      if (!publicClient || !address) return;
      const hasBalanceToMint = balance > 0.000111000000000001;
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
          token.token.tokenId,
          BigInt(1),
          [],
          minterArguments,
        ],
        value: BigInt(111000000000001),
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      addComment({
        tokenId: token.tokenId,
        sender: address,
        comment,
        blockNumber: receipt.blockNumber,
        transactionHash: receipt.transactionHash,
        timestamp: new Date().getTime(),
      });
      setComment("");
      setIsLoading(false);
      return receipt;
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return {
    mintComment,
    isOpenCrossmint,
    setIsOpenCrossmint,
    isLoading,
  };
};

export default useZoraMintComment;
