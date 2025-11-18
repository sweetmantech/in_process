"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Address } from "viem";
import useMomentCreateParameters from "./useMomentCreateParameters";
import { useUserProvider } from "@/providers/UserProvider";
import { createMomentApi } from "@/lib/moment/createMomentApi";
import { syncMomentApi } from "@/lib/moment/syncMomentApi";
import { usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";

export default function useMomentCreate() {
  const [creating, setCreating] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const collection = searchParams.get("collectionAddress") as Address;
  const [createdContract, setCreatedContract] = useState<string>("");
  const [createdTokenId, setCreatedTokenId] = useState<string>("");
  const { fetchParameters } = useMomentCreateParameters();
  const { isPrepared } = useUserProvider();
  const { getAccessToken } = usePrivy();

  const create = async () => {
    try {
      if (!isPrepared()) return;

      setCreating(true);
      const parameters = await fetchParameters(collection);
      if (!parameters) {
        throw new Error("Parameters not ready");
      }
      const result = await createMomentApi(parameters);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const accessToken = await getAccessToken();
      await syncMomentApi(accessToken as string);

      setCreating(false);
      setCreatedContract(result.contractAddress);
      setCreatedTokenId(result.tokenId?.toString() || "");
      migrateMuxToArweaveApi({
        tokenContractAddress: result.contractAddress as Address,
        tokenId: result.tokenId.toString(),
        accessToken: accessToken as string,
      });
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
  };
}
