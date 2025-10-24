"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Address } from "viem";
import useMomentCreateParameters from "./useMomentCreateParameters";
import { useMask } from "./useMask";
import { useUserProvider } from "@/providers/UserProvider";
import { createMoment } from "@/lib/moment/createMoment";
import { toast } from "sonner";

export default function useMomentCreate() {
  const [creating, setCreating] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const collection = searchParams.get("collectionAddress") as Address;
  const [createdContract, setCreatedContract] = useState<string>("");
  const [createdTokenId, setCreatedTokenId] = useState<string>("");
  const { fetchParameters, createMetadata, advancedValues } = useMomentCreateParameters(collection);
  const mask = useMask(advancedValues.isOpenAdvanced, createMetadata.writingText);
  const { isPrepared } = useUserProvider();

  const create = async () => {
    try {
      if (!isPrepared()) return;
      setCreating(true);
      const parameters = await fetchParameters();
      if (!parameters) {
        throw new Error("Parameters not ready");
      }
      const result = await createMoment(parameters);
      setCreating(false);
      setCreatedContract(result.contractAddress);
      setCreatedTokenId(result.tokenId?.toString() || "");
      return result;
    } catch (err) {
      setCreating(false);
      const errorMessage = (err as any)?.message || "Failed to create moment";
      toast.error(errorMessage);
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
  };
}
