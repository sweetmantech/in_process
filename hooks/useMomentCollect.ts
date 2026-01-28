import { useState } from "react";
import { Address } from "viem";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { toast } from "sonner";
import useCollectBalanceValidation from "./useCollectBalanceValidation";
import { usePrivy } from "@privy-io/react-auth";
import { collectMomentApi } from "@/lib/moment/collectMomentApi";
import { useMomentCommentsProvider } from "@/providers/MomentCommentsProvider";

const useMomentCollect = () => {
  const [amountToCollect, setAmountToCollect] = useState(1);
  const [collected, setCollected] = useState(false);
  const { artistWallet } = useUserProvider();
  const [isLoading, setIsLoading] = useState(false);
  const { moment, saleConfig } = useMomentProvider();
  const { comment, addComment, setComment, setIsOpenCommentModal } = useMomentCommentsProvider();
  const { validateBalance } = useCollectBalanceValidation();
  const { getAccessToken } = usePrivy();

  const collectWithComment = async () => {
    try {
      if (!saleConfig) return;
      if (!artistWallet) return;
      setIsLoading(true);

      validateBalance(saleConfig, amountToCollect);
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error("Failed to get access token");
      }
      await collectMomentApi(moment, amountToCollect, comment, accessToken);
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

  return {
    collectWithComment,
    isLoading,
    amountToCollect,
    setAmountToCollect,
    comment,
    setComment,
    collected,
    setCollected,
  };
};

export default useMomentCollect;
