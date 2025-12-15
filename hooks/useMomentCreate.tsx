"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Address } from "viem";
import { useQueryClient } from "@tanstack/react-query";
import useMomentCreateParameters from "./useMomentCreateParameters";
import { useUserProvider } from "@/providers/UserProvider";
import { createMomentApi } from "@/lib/moment/createMomentApi";
import { usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";
import { migrateMuxToArweaveApi } from "@/lib/mux/migrateMuxToArweaveApi";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { CHAIN_ID } from "@/lib/consts";
import { createCollectionApi } from "@/lib/collections/createCollectionApi";
import { useCreatedStatus } from "./useCreatedStatus";
import { CollectionsResponse, CollectionItem } from "@/types/collections";

export default function useMomentCreate() {
  const [creating, setCreating] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const collection = searchParams.get("collectionAddress") as Address;
  const { fetchParameters } = useMomentCreateParameters();
  const { isPrepared, artistWallet, profile } = useUserProvider();
  const { getAccessToken } = usePrivy();
  const { mimeType, setUploadProgress, setIsUploading, resetForm, name } =
    useMetadataFormProvider();
  const {
    createdContract,
    setCreatedContract,
    createdTokenId,
    setCreatedTokenId,
    updateUrlWithCollectionAddress,
  } = useCreatedStatus();
  const queryClient = useQueryClient();

  const create = async () => {
    try {
      if (!isPrepared()) return;
      if (!artistWallet) return;

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
      const tokenId = "tokenId" in result ? result.tokenId : undefined;
      if (Boolean(tokenId)) {
        setCreatedTokenId(tokenId?.toString() || "");
        setCreatedContract(result.contractAddress);
      }

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
      if (tokenId === undefined && "uri" in parameters) {
        toast.success("Collection created successfully");
        const queryKey = ["collections", artistWallet];
        const newCollectionItem: CollectionItem = {
          id: `${result.contractAddress.toLowerCase()}-${CHAIN_ID}`,
          address: result.contractAddress.toLowerCase(),
          chain_id: CHAIN_ID,
          uri: parameters.uri,
          name,
          created_at: new Date().toISOString(),
          default_admin: {
            username: profile?.username || null,
            address: artistWallet.toLowerCase(),
          },
        };

        queryClient.setQueryData<CollectionsResponse>(queryKey, (oldData) => {
          const existingCollections = oldData?.collections || [];
          return {
            status: "success",
            collections: [newCollectionItem, ...existingCollections],
            pagination: oldData?.pagination || {
              page: 1,
              limit: 100,
              total_pages: 1,
            },
          };
        });

        resetForm();
        updateUrlWithCollectionAddress(result.contractAddress.toLowerCase());
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
