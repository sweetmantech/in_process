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

export default function useMomentCreate() {
  const [creating, setCreating] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const collection = searchParams.get("collectionAddress") as Address;
  const [createdContract, setCreatedContract] = useState<string>("");
  const [createdTokenId, setCreatedTokenId] = useState<string>("");
  const { fetchParameters, createMetadata, advancedValues } = useMomentCreateParameters(collection);
  const mask = useMask(advancedValues.isOpenAdvanced, createMetadata.writingText);
  const { isPrepared } = useUserProvider();
  const { getAccessToken } = usePrivy();

  const create = async () => {
    try {
      if (!isPrepared()) return;
      setCreating(true);
      const parameters = await fetchParameters();
      if (!parameters) {
        throw new Error("Parameters not ready");
      }
      const result = await createMoment(parameters);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error("No access token found");
      }
      await syncMomentApi(accessToken as string);
      setCreating(false);
      setCreatedContract(result.contractAddress);
      setCreatedTokenId(result.tokenId?.toString() || "");
      return result;
    } catch (err) {
      setCreating(false);
      console.error(err);
      throw err;
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
