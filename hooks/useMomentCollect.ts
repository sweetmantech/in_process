import { useState } from "react";
import { Address } from "viem";
import { useMutation } from "@tanstack/react-query";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import { toast } from "sonner";
import useCollectBalanceValidation from "./useCollectBalanceValidation";
import useFarcasterTopup from "./useFarcasterTopup";
import { collectMomentApi } from "@/lib/moment/collectMomentApi";
import { useMomentCommentsProvider } from "@/providers/MomentCommentsProvider";
import { Protocol } from "@/types/moment";
import { showInsufficientBalanceError } from "@/lib/balance/showInsufficientBalanceError";
import { isUserRejection } from "@/lib/viem/isUserRejection";

const useMomentCollect = () => {
  const [amountToCollect, setAmountToCollect] = useState(1);
  const [collected, setCollected] = useState(false);
  const { artistWallet, isFarcasterMiniApp } = useUserProvider();
  const { moment, saleConfig, protocol } = useMomentProvider();
  const { comment, addComment, setComment, setIsOpenCommentModal } = useMomentCommentsProvider();
  const { checkBalance } = useCollectBalanceValidation();
  const { getAuthHeaders } = useUserProvider();
  const { topup } = useFarcasterTopup();
  const { smartWallet } = useSmartWalletProvider();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!artistWallet) throw new Error("No wallet connected");
      if (!saleConfig) throw new Error("Sale config not found");

      if (protocol !== Protocol.InProcess) {
        throw new Error("Collecting is not supported for Sound.xyz or Catalog moments");
      }

      const { sufficient, currency, shortfall } = checkBalance(saleConfig, amountToCollect);
      if (!sufficient) {
        if (isFarcasterMiniApp && smartWallet) {
          await topup(currency, shortfall, smartWallet as Address);
        } else {
          showInsufficientBalanceError(currency);
        }
      }

      const headers = await getAuthHeaders();
      return collectMomentApi(moment, amountToCollect, comment, headers);
    },
    onSuccess: () => {
      if (protocol !== Protocol.Catalog) {
        addComment({
          sender: artistWallet as Address,
          comment,
          timestamp: new Date().getTime(),
        } as any);
        setComment("");
        setIsOpenCommentModal(false);
      }
      setCollected(true);
      toast.success("collected!");
    },
    onError: (error: any) => {
      if (isUserRejection(error)) {
        toast.error("Topup rejected");
      } else if (!error?.message?.includes("funds")) {
        toast.error("Failed to collect moment");
      }
    },
  });

  return {
    collectWithComment: () => mutation.mutate(),
    isLoading: mutation.isPending,
    amountToCollect,
    setAmountToCollect,
    comment,
    setComment,
    collected,
    setCollected,
  };
};

export default useMomentCollect;
