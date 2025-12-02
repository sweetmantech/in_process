"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Address } from "viem";
import useMomentCreateParameters from "./useMomentCreateParameters";
import { useUserProvider } from "@/providers/UserProvider";
import { createMomentApi } from "@/lib/moment/createMomentApi";
import { usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";
import { migrateMuxToArweaveApi } from "@/lib/mux/migrateMuxToArweaveApi";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { CHAIN_ID } from "@/lib/consts";

export default function useMomentCreate() {
  const [creating, setCreating] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const collection = searchParams.get("collectionAddress") as Address;
  const [createdContract, setCreatedContract] = useState<string>("");
  const [createdTokenId, setCreatedTokenId] = useState<string>("");
  const { fetchParameters } = useMomentCreateParameters();
  const { isPrepared } = useUserProvider();
  const { getAccessToken } = usePrivy();
  const { setAnimationUri, mimeType } = useMomentFormProvider();

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

      setCreating(false);
      setCreatedContract(result.contractAddress);
      setCreatedTokenId(result.tokenId?.toString() || "");

      if (mimeType.includes("video")) {
        const migrateMuxToArweaveResult = await migrateMuxToArweaveApi({
          moment: {
            collectionAddress: createdContract as Address,
            tokenId: createdTokenId,
            chainId: CHAIN_ID,
          },
          accessToken: accessToken as string,
        });
        setAnimationUri(getFetchableUrl(migrateMuxToArweaveResult.arweaveUri) || "");
      }
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
