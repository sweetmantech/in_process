import { useEffect, useState } from "react";
import useBalance from "./useBalance";
import { useAccount } from "wagmi";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { zoraCreatorFixedPriceSaleStrategyAddress } from "@/lib/protocolSdk/constants";
import { CHAIN } from "@/lib/consts";
import {
  Address,
  encodeAbiParameters,
  formatEther,
  parseAbiParameters,
} from "viem";
import { useTokenProvider } from "@/providers/TokenProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { useCrossmintCheckout } from "@crossmint/client-sdk-react-ui";
import useConnectedWallet from "./useConnectedWallet";
import { getPublicClient } from "@/lib/viem/publicClient";
import { useFrameProvider } from "@/providers/FrameProvider";
import { toast } from "sonner";
import useSignTransaction from "./useSignTransaction";

const mintOnSmartWallet = async (parameters: any) => {
  const response = await fetch(`/api/smartwallet/sendUserOperation`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      parameters,
    }),
  });

  const data = await response.json();

  return data.transactionHash;
};

const useZoraMintComment = () => {
  const [isOpenCrossmint, setIsOpenCrossmint] = useState(false);
  const { balance } = useBalance();
  const { connectedWallet } = useConnectedWallet();
  const { address } = useAccount();
  const { context } = useFrameProvider();
  const [isLoading, setIsLoading] = useState(false);
  const {
    token,
    comment,
    addComment,
    setComment,
    setIsOpenCommentModal,
    saleConfig,
    setCollected,
  } = useTokenProvider();
  const { data: sale } = saleConfig;
  const { isPrepared } = useUserProvider();
  const { order } = useCrossmintCheckout();
  const { signTransaction } = useSignTransaction();

  const mintComment = async () => {
    try {
      if (!isPrepared()) return;
      if (!sale) return;
      setIsLoading(true);
      const minter = context ? address : connectedWallet;

      const publicClient = getPublicClient();
      const minterArguments = encodeAbiParameters(
        parseAbiParameters("address, string"),
        [minter as Address, comment],
      );

      let hash: Address | null = null;

      if (sale.pricePerToken === BigInt(0)) {
        hash = await mintOnSmartWallet({
          address: token.token.contract.address,
          abi: zoraCreator1155ImplABI,
          functionName: "mint",
          args: [
            zoraCreatorFixedPriceSaleStrategyAddress[CHAIN.id],
            token.token.tokenId,
            1,
            [],
            minterArguments,
          ],
        });
      } else {
        const hasBalanceToMint =
          balance > Number(formatEther(BigInt(sale.pricePerToken)));
        if (!hasBalanceToMint) {
          setIsLoading(false);
          setIsOpenCrossmint(true);
          setIsOpenCommentModal(false);
          return;
        }
        hash = await signTransaction({
          address: token.token.contract.address,
          account: minter as Address,
          abi: zoraCreator1155ImplABI,
          functionName: "mint",
          args: [
            zoraCreatorFixedPriceSaleStrategyAddress[CHAIN.id],
            BigInt(token.token.tokenId),
            BigInt(1),
            [],
            minterArguments,
          ],
          value: BigInt(sale.pricePerToken),
        });
      }

      if (!hash) throw new Error();
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      addComment({
        sender: minter as Address,
        comment,
        timestamp: new Date().getTime(),
      } as any);
      setComment("");
      setIsOpenCommentModal(false);
      setCollected(true);
      toast.success("collected!");
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
