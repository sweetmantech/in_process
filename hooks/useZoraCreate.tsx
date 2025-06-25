"use client";

import { useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { Address } from "viem";
import useZoraCreateParameters from "./useZoraCreateParameters";
import { useMask } from "./useMask";
import { useUserProvider } from "@/providers/UserProvider";

type Currency = "ETH" | "USD";

export default function useZoraCreate() {
  const [creating, setCreating] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const collection = searchParams.get("collectionAddress") as Address;
  const [createdContract, setCreatedContract] = useState<string>("");
  const [createdTokenId, setCreatedTokenId] = useState<string>("");
  
  // Currency selection state - defaults to USD for /usdc routes, ETH otherwise
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    pathname.includes("/usdc") ? "USD" : "ETH"
  );
  const { fetchParameters, createMetadata, advancedValues } =
    useZoraCreateParameters(collection, selectedCurrency);
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

  return {
    createdContract,
    createdTokenId,
    setCreatedTokenId,
    setCreatedContract,
    create,
    creating,
    selectedCurrency,
    setSelectedCurrency,
    ...createMetadata,
    ...mask,
    ...advancedValues,
  };
}
