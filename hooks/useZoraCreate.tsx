"use client";

import { useState } from "react";
import useZoraCreateParameters from "./useZoraCreateParameters";
import { useMask } from "./useMask";
import { useUserProvider } from "@/providers/UserProvider";

export default function useZoraCreate() {
  const [creating, setCreating] = useState<boolean>(false);
  const [createdContract, setCreatedContract] = useState<string>("");
  const [createdTokenId, setCreatedTokenId] = useState<string>("");
  const { fetchParameters, createMetadata, advancedValues } =
    useZoraCreateParameters();
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
      console.log("parameters", parameters);
      // Call the API endpoint to create the contract and moment
      const response = await fetch("/api/moment/create", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(parameters),
      });
      console.log("response", response);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "API error");
      }
      const data = await response.json();
      setCreatedContract(data.contractAddress);
      setCreatedTokenId(data.tokenId);
      setCreating(false);
      return { contractAddress: data.contractAddress, tokenId: data.tokenId };
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
