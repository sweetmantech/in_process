import { useEffect, useState } from "react";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { zoraCreatorFixedPriceSaleStrategyAddress } from "@/lib/protocolSdk/constants";
import { CHAIN } from "@/lib/consts";
import { Address, encodeAbiParameters, parseAbiParameters } from "viem";
import { useTokenProvider } from "@/providers/TokenProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { useCrossmintCheckout } from "@crossmint/client-sdk-react-ui";
import { toast } from "sonner";
import useCollectBalanceValidation from "./useCollectBalanceValidation";
import { usePrivy } from "@privy-io/react-auth";
import { collectMomentApi } from "@/lib/moment/collectMomentApi";

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

const useMomentCollect = () => {
  const [isOpenCrossmint, setIsOpenCrossmint] = useState(false);
  const { artistWallet } = useUserProvider();
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
  const { order } = useCrossmintCheckout();
  const { validateBalance } = useCollectBalanceValidation();
  const { getAccessToken } = usePrivy();

  const collectWithComment = async () => {
    try {
      if (!saleConfig) return;
      if (!artistWallet) return;
      setIsLoading(true);
      const minterArguments = encodeAbiParameters(parseAbiParameters("address, string"), [
        artistWallet,
        comment,
      ]);

      if (parseInt(saleConfig.pricePerToken, 10) > 0) {
        validateBalance(saleConfig, mintCount);
        const accessToken = await getAccessToken();
        if (!accessToken) {
          throw new Error("Failed to get access token");
        }
        await collectMomentApi(
          {
            contractAddress: token.tokenContractAddress,
            tokenId: token.tokenId,
          },
          mintCount,
          comment,
          accessToken
        );
      } else {
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
      }
      addComment({
        sender: artistWallet as Address,
        comment,
        timestamp: new Date().getTime(),
      } as any);
      setComment("");
      setIsOpenCommentModal(false);
      setCollected(true);
      toast.success("collected!");
      setIsLoading(false);
    } catch (error) {
      const errorMessage = (error as any).message || "Failed to collect moment";
      if (!errorMessage.includes("funds")) {
        toast.error(errorMessage);
      }
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
    collectWithComment,
    isOpenCrossmint,
    setIsOpenCrossmint,
    isLoading,
  };
};

export default useMomentCollect;
