"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getAddress } from "viem";
import { useTokenProvider } from "@/providers/TokenProvider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MediaSkeleton from "./MediaSkeleton";
import ImageUpload from "./ImageUpload";
import MediaButton from "./MediaButton";
import useMediaConfig from "@/hooks/useMediaConfig";
import { useUserProvider } from "@/providers/UserProvider";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";

const Media = () => {
  const { collection } = useCollectionProvider();
  const { connectedAddress } = useUserProvider();
  const { metadata, token, owner } = useTokenProvider();
  const { data: meta, isLoading } = metadata;
  const { setMetadata, generateNewMetadataFromToken, isLoading: isSaving, } = useMediaConfig();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [originalImageUri, setOriginalImageUri] = useState("");

  useEffect(() => {
    if (!meta) return;
    if (!title) setTitle(meta.name || "");
    if (!description) setDescription(meta.description || "");
    if (meta.image && !imageUri) {
      const fetchableUrl = getFetchableUrl(meta.image);
      if (fetchableUrl) {
        setOriginalImageUri(fetchableUrl);
        setImageUri(fetchableUrl);
      }
    }
  }, [meta, title, description, imageUri]);

  const isOwner = Boolean(connectedAddress && owner && getAddress(connectedAddress) === getAddress(owner));

  const onSave = async () => {
    if (!isOwner || !token || !collection) return;
    try {
      const newUri = await generateNewMetadataFromToken(
        collection.chainId,
        token.tokenContractAddress,
        token.tokenId,
        title,
        description,
        imageUri || originalImageUri,
      );
      await setMetadata(newUri);
      toast.success("Metadata updated successfully!");
    } catch (e) {
      toast.error("Failed to save metadata");
    }
  }

  const handleImageChange = (newImageUri: string) => {
    const fetchableUrl = getFetchableUrl(newImageUri);
    if (fetchableUrl) {
      setImageUri(fetchableUrl);
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
            <label className="font-archivo text-sm text-grey-moss-600 block mb-1"> title</label>
            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="enter a title" />
          </div>

          <div>
            <label className="font-archivo text-sm text-grey-moss-600 block mb-1">description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="font-archivo focus:border-grey-moss-500"
              minRows={3}
              placeholder="enter a description"
            />
          </div>
          <ImageUpload initialImageUri={originalImageUri} onImageChange={handleImageChange} disabled={!isOwner} />
          <MediaButton onSave={onSave} disabled={isLoading || isSaving || !isOwner} isSaving={isSaving} isOwner={isOwner} />
        </div>
      </div>
    </div>
  );
};

export default Media;
