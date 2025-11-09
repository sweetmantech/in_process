"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Address, isAddress } from "viem";
import useMomentCreateParameters from "./useMomentCreateParameters";
import { useMask } from "./useMask";
import { useUserProvider } from "@/providers/UserProvider";
import { createMoment } from "@/lib/moment/createMoment";
import { syncMomentApi } from "@/lib/moment/syncMomentApi";
import { usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";
import { Split } from "./useSplits";
import isValidEnsName from "@/lib/ens/isValidEnsName";
import validateAddress from "@/lib/ens/validateAddress";

const validateSplits = (splits: Split[], addressErrors: Record<number, string>): string | null => {
  if (splits.length === 0) {
    return null; // No splits, validation passes
  }

  // Check total percentage
  const totalPercentage = splits.reduce((sum, split) => sum + (split.percentage || 0), 0);
  if (totalPercentage !== 100) {
    return "Splits total percentage must equal 100%";
  }

  // Check each split
  for (let i = 0; i < splits.length; i++) {
    const split = splits[i];

    // Check address is not empty
    if (!split.address || split.address.trim() === "") {
      return `Split ${i + 1}: Address is required`;
    }

    // Check for address errors
    if (addressErrors[i]) {
      return `Split ${i + 1}: ${addressErrors[i]}`;
    }

    // Validate address format
    const addressError = validateAddress(split.address);
    if (addressError) {
      return `Split ${i + 1}: ${addressError}`;
    }

    // Additional validation: check if it's a valid address or ENS name
    if (!isAddress(split.address)) {
      if (split.address.includes(".")) {
        // It's an ENS name, validate it
        if (!isValidEnsName(split.address)) {
          return `Split ${i + 1}: Invalid ENS name`;
        }
      } else {
        // Not an address and not an ENS name
        return `Split ${i + 1}: Invalid address or ENS name`;
      }
    }

    // Check percentage is valid
    if (split.percentage === undefined || split.percentage === null || isNaN(split.percentage)) {
      return `Split ${i + 1}: Percentage is required`;
    }

    if (split.percentage < 0 || split.percentage > 100) {
      return `Split ${i + 1}: Percentage must be between 0 and 100`;
    }
  }

  return null; // All validations passed
};

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
