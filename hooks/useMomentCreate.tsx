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
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { CHAIN_ID } from "@/lib/consts";
import { createCollectionApi } from "@/lib/collections/createCollectionApi";

export default function useMomentCreate() {
  const [creating, setCreating] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const collection = searchParams.get("collectionAddress") as Address;
  const [createdContract, setCreatedContract] = useState<string>("");
  const [createdTokenId, setCreatedTokenId] = useState<string>("");
  const { fetchParameters } = useMomentCreateParameters();
  const { isPrepared } = useUserProvider();
  const { getAccessToken } = usePrivy();
  const { mimeType, setUploadProgress, setIsUploading } = useMetadataFormProvider();

  const create = async () => {
    try {
      if (!isPrepared()) return;

      setCreating(true);
      setIsUploading(true);
      setUploadProgress(0);

      const parameters = await fetchParameters(collection);
      if (!parameters) {
        throw new Error("Parameters not ready");
      }

      let result = null;
      if ("token" in parameters) {
        result = await createMomentApi(parameters);
      } else {
        result = await createCollectionApi(parameters);
      }

      await new Promise((resolve) => setTimeout(resolve, 3000));
      const accessToken = await getAccessToken();

      setCreating(false);
      setIsUploading(false);
      setUploadProgress(100);
      setCreatedContract(result.contractAddress);
      const tokenId = "tokenId" in result ? result.tokenId : undefined;
      setCreatedTokenId(tokenId?.toString() || "");

      if (mimeType.includes("video") && accessToken) {
        await migrateMuxToArweaveApi(
          {
            collectionAddress: result.contractAddress as Address,
            tokenIds: [tokenId?.toString() || "0"],
            chainId: CHAIN_ID,
          },
          accessToken
        );
      }
      return result;
    } catch (err: any) {
      setCreating(false);
      setIsUploading(false);
      setUploadProgress(0);
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
