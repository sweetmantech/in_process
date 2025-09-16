"use client";
import { toast } from "sonner";
import { getAddress } from "viem";

import { useTokenProvider } from "@/providers/TokenProvider";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MediaSkeleton from "./MediaSkeleton";
import useMediaConfig from "@/hooks/useMediaConfig";
import { useUserProvider } from "@/providers/UserProvider";
import { useCollectionProvider } from "@/providers/CollectionProvider";

const Media = () => {
  const { collection } = useCollectionProvider();
  const { connectedAddress } = useUserProvider();

  const { metadata, token, owner } = useTokenProvider();
  const { data: meta, isLoading } = metadata;

  const {
    setMetadata,
    generateNewMetadataFromToken,
    isLoading: isSaving,
  } = useMediaConfig();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!meta) return;
    if (!title) setTitle(meta.name || "");
    if (!description) setDescription(meta.description || "");
  }, [meta, title, description]);

  const isOwner = Boolean(
    connectedAddress && owner &&
    getAddress(connectedAddress) === getAddress(owner)
  );

  const onSave = async () => {
    if (!isOwner || !token || !collection) return;
    try {
      const newUri = await generateNewMetadataFromToken(
        collection.chainId,
        token.tokenContractAddress,
        token.tokenId,
        title,
        description,
      );
      await setMetadata(newUri);
      toast.success("Metadata updated successfully!");
    } catch (e) {
      toast.error("Failed to save metadata");
    }
  };

  if (isLoading || !meta) {
    return <MediaSkeleton />;
  }

  return (
    <div className="px-4 md:px-10 w-full font-archivo">
      <div className="bg-white rounded-lg shadow-sm p-6 max-w-md mt-4">
        <div className="space-y-4">
          <div>
            <label className="font-archivo text-sm text-grey-moss-600 block mb-1">
              title
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="enter a title"
            />
          </div>

          <div>
            <label className="font-archivo text-sm text-grey-moss-600 block mb-1">
              description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="font-archivo focus:border-grey-moss-500"
              minRows={3}
              placeholder="enter a description"
            />
          </div>

          <button
            className="bg-black text-grey-eggshell w-fit px-8 py-2 rounded-md disabled:opacity-50"
            onClick={onSave}
            disabled={isLoading || isSaving || !isOwner}
          >
            {isSaving ? "saving..." : "Save"}
          </button>
          {!isOwner && (
            <p className="text-xs text-grey-moss-500">
              Only the contract owner can save changes.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Media;
