import { useState } from "react";
import { Address } from "viem";
import { useMutation } from "@tanstack/react-query";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { toast } from "sonner";
import useCollectBalanceValidation from "./useCollectBalanceValidation";
import { usePrivy } from "@privy-io/react-auth";
import { collectMomentApi } from "@/lib/moment/collectMomentApi";
import { collectCatalogMomentApi } from "@/lib/catalog/collectCatalogMomentApi";
import { useMomentCommentsProvider } from "@/providers/MomentCommentsProvider";
import { Protocol } from "@/types/moment";

const useMomentCollect = () => {
  const [amountToCollect, setAmountToCollect] = useState(1);
  const [collected, setCollected] = useState(false);
  const { artistWallet } = useUserProvider();
  const { moment, saleConfig, protocol } = useMomentProvider();
  const { comment, addComment, setComment, setIsOpenCommentModal } = useMomentCommentsProvider();
  const { validateBalance } = useCollectBalanceValidation();
  const { getAccessToken } = usePrivy();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!artistWallet) throw new Error("No wallet connected");

      const accessToken = await getAccessToken();
      if (!accessToken) throw new Error("Failed to get access token");

      if (!saleConfig) throw new Error("Sale config not found");
      validateBalance(saleConfig, amountToCollect);

      if (protocol === Protocol.SoundXyz) {
        throw new Error("In*Process is not supported for Sound.xyz moments");
      }

      if (protocol === Protocol.Catalog) {
        return collectCatalogMomentApi(moment, amountToCollect, accessToken);
      }

      return collectMomentApi(moment, amountToCollect, comment, accessToken);
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
      const errorMessage = error?.message || "Failed to collect moment";
      if (!errorMessage.includes("funds")) {
        toast.error(errorMessage);
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
