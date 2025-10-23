import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { zoraCreatorFixedPriceSaleStrategyAddress } from "@/lib/protocolSdk/constants";
import { CHAIN } from "@/lib/consts";
import { Address, encodeAbiParameters, parseAbiParameters } from "viem";
import { useTokenProvider } from "@/providers/TokenProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { useCrossmintCheckout } from "@crossmint/client-sdk-react-ui";
import useConnectedWallet from "./useConnectedWallet";
import { useFrameProvider } from "@/providers/FrameProvider";
import { toast } from "sonner";
import { MintType } from "@/types/zora";
import useUsdcMint from "./useUsdcMint";
import useNativeMint from "./useNativeMint";

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
    mintCount,
  } = useTokenProvider();
  const { isPrepared } = useUserProvider();
  const { order } = useCrossmintCheckout();
  const { mintWithUsdc } = useUsdcMint();
  const { mintWithNativeToken } = useNativeMint();

  const mintComment = async () => {
    try {
      if (!isPrepared()) return;
      if (!saleConfig) return;
      setIsLoading(true);
      const account = context ? address : connectedWallet;
      console.log('ziad here', account)
      const minterArguments = encodeAbiParameters(parseAbiParameters("address, string"), [
        account as Address,
        comment,
      ]);

      if (saleConfig.pricePerToken === BigInt(0)) {
        await mintOnSmartWallet({
          address: token.tokenContractAddress,
          abi: zoraCreator1155ImplABI,
          functionName: "mint",
          args: [
            zoraCreatorFixedPriceSaleStrategyAddress[CHAIN.id],
            token.tokenId,
            mintCount,
            [],
            minterArguments,
          ],
        });
      } else {
        if (saleConfig.type === MintType.ZoraErc20Mint)
          await mintWithUsdc(saleConfig, token, comment, mintCount);
        else await mintWithNativeToken(saleConfig, token, comment, mintCount);
      }
      addComment({
        sender: account as Address,
        comment,
        timestamp: new Date().getTime(),
      } as any);
      setComment("");
      setIsOpenCommentModal(false);
      setCollected(true);
      toast.success("collected!");
      setIsLoading(false);
    } catch (error) {
      toast.error((error as any)?.message);
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
