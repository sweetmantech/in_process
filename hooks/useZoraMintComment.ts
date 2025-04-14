import { useEffect, useState } from "react";
import useBalance from "./useBalance";
import { useAccount } from "wagmi";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { zoraCreatorFixedPriceSaleStrategyAddress } from "@/lib/protocolSdk/constants";
import { CHAIN } from "@/lib/consts";
import { Address, encodeAbiParameters, parseAbiParameters } from "viem";
import { useTokenProvider } from "@/providers/TokenProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { useCrossmintCheckout } from "@crossmint/client-sdk-react-ui";
import useConnectedWallet from "./useConnectedWallet";
import { getPublicClient } from "@/lib/viem/publicClient";
import { useFrameProvider } from "@/providers/FrameProvider";
import { toast } from "sonner";
import useSignTransaction from "./useSignTransaction";
import hasSufficiency from "@/lib/hasSufficiency";
import { MintType } from "@/types/zora";
import useUsdc from "./useUsdc";
import getCollectRequest from "@/lib/getCollectRequest";

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
  const balances = useBalance();
  const { hasAllowance, approve } = useUsdc();
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
      const account = context ? address : connectedWallet;

      const publicClient = getPublicClient();
      const minterArguments = encodeAbiParameters(
        parseAbiParameters("address, string"),
        [account as Address, comment],
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
        const hasEnoughAmount = hasSufficiency(sale, balances);
        if (!hasEnoughAmount) {
          setIsLoading(false);
          setIsOpenCrossmint(true);
          setIsOpenCommentModal(false);
          return;
        }
        if (sale.type === MintType.ZoraErc20Mint) {
          const sufficientAllowance = await hasAllowance(sale);
          if (!sufficientAllowance) {
            toast.error(
              `Insufficient allowance. please sign initial tx to grant max allowance`,
            );
            await approve();
          }
        }
        const request = getCollectRequest(
          token,
          sale,
          account as Address,
          comment,
        );
        if (!request) throw new Error();
        hash = await signTransaction(request);
      }

      if (!hash) throw new Error();
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
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
