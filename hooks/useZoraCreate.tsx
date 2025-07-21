"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Address } from "viem";
import useZoraCreateParameters from "./useZoraCreateParameters";
import { useMask } from "./useMask";
import { useUserProvider } from "@/providers/UserProvider";

export default function useZoraCreate() {
  const [creating, setCreating] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const collection = searchParams.get("collectionAddress") as Address;
  const [createdContract, setCreatedContract] = useState<string>("");
  const [createdTokenId, setCreatedTokenId] = useState<string>("");
  const { fetchParameters, createMetadata, advancedValues } =
    useZoraCreateParameters(collection);
  const mask = useMask(
    advancedValues.isOpenAdvanced,
    createMetadata.writingText
  );
  const { isPrepared } = useUserProvider();

  const create = async () => {
    try {
      if (!isPrepared()) return;
      setCreating(true);
      const parameters = await fetchParameters();
      if (!parameters) {
        throw new Error("Parameters not ready");
      }
      const response = await fetch("/api/moment/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parameters),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create moment");
      }
      const result = await response.json();
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

  const providerData = {
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

  // Debug: Log what data is being provided
  console.log('useZoraCreate provider data:', {
    hasImageScale: 'imageScale' in providerData,
    hasImageOffset: 'imageOffset' in providerData,
    imageScale: providerData.imageScale,
    imageOffset: providerData.imageOffset,
    createMetadataKeys: Object.keys(createMetadata)
  });

  return providerData;
}
