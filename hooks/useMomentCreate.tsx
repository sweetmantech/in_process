"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Address } from "viem";
import useMomentCreateParameters from "./useMomentCreateParameters";
import { useMask } from "./useMask";
import { useUserProvider } from "@/providers/UserProvider";
import { createMoment } from "@/lib/moment/createMoment";
import { syncMomentApi } from "@/lib/moment/syncMomentApi";
import { usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";
import { validateSplits } from "@/lib/splits/validateSplits";

export default function useMomentCreate() {
  const [creating, setCreating] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const collection = searchParams.get("collectionAddress") as Address;
  const [createdContract, setCreatedContract] = useState<string>("");
  const [createdTokenId, setCreatedTokenId] = useState<string>("");
  const { fetchParameters, createMetadata, advancedValues, splits } =
    useMomentCreateParameters(collection);
  const mask = useMask(advancedValues.isOpenAdvanced, createMetadata.writingText);
  const { isPrepared } = useUserProvider();
  const { getAccessToken } = usePrivy();

  const create = async () => {
    try {
      if (!isPrepared()) return;

      // Validate splits before creating
      const splitsValidationError = validateSplits(splits.splits, splits.addressErrors);
      if (splitsValidationError) {
        toast.error(splitsValidationError);
        return;
      }

      setCreating(true);
      const parameters = await fetchParameters();
      if (!parameters) {
        throw new Error("Parameters not ready");
      }
      const result = await createMoment(parameters);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const accessToken = await getAccessToken();
      await syncMomentApi(accessToken as string);
      setCreating(false);
      setCreatedContract(result.contractAddress);
      setCreatedTokenId(result.tokenId?.toString() || "");
      return result;
    } catch (err: any) {
      setCreating(false);
      toast.error(err?.message || "Error creating");
    }
  };

  return {
    createdContract,
    createdTokenId,
    setCreatedTokenId,
    setCreatedContract,
    create,
    creating,
    ...createMetadata,
    ...mask,
    ...advancedValues,
    ...splits,
  };
}
