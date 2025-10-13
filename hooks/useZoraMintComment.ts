import { useEffect, useState } from "react";
import { Address } from "viem";
import { useTokenProvider } from "@/providers/TokenProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { useCrossmintCheckout } from "@crossmint/client-sdk-react-ui";
import { toast } from "sonner";
import { MintType } from "@/types/zora";
import useUsdcMint from "./useUsdcMint";
import useNativeMint from "./useNativeMint";
import mintOnSmartWallet from "@/lib/smartwallets/mintOnSmartWallet";

const useZoraMintComment = () => {
  const [isOpenCrossmint, setIsOpenCrossmint] = useState(false);
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
  const { isPrepared, externalWallet, connectedAddress } = useUserProvider();
  const account = externalWallet || connectedAddress;
  const { order } = useCrossmintCheckout();
  const { mintWithUsdc } = useUsdcMint();
  const { mintWithNativeToken } = useNativeMint();

  const mintWithCrossmint = () => {
    setIsLoading(false);
    setIsOpenCrossmint(true);
    setIsOpenCommentModal(false);
  };
  const mintComment = async () => {
    try {
      if (!isPrepared()) return;
      if (!saleConfig) return;
      setIsLoading(true);
      if (saleConfig.pricePerToken === BigInt(0)) {
        await mintOnSmartWallet({
          token: {
            tokenId: Number(token.tokenId),
            tokenContractAddress: token.tokenContractAddress,
          },
          account: connectedAddress as Address,
          to: (externalWallet || connectedAddress) as Address,
          comment,
          amount: mintCount,
        });
      } else {
        let receipt = null;
        if (saleConfig.type === MintType.ZoraErc20Mint)
          receipt = await mintWithUsdc(saleConfig, token, comment, mintCount);
        else receipt = await mintWithNativeToken(saleConfig, token, comment, mintCount);

        if (!Boolean(receipt)) {
          mintWithCrossmint();
          return;
        }
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
