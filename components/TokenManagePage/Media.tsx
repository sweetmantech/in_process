"use client";
import { useEffect } from "react";

import { useTokenProvider } from "@/providers/TokenProvider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MediaSkeleton from "./MediaSkeleton";
import OwnerWarning from "./OwnerWarning";
import SaveMediaButton from "./SaveMediaButton";
import { useMomentManageProvider } from "@/providers/MomentManageProvider";
import ImageUpload from "@/components/TokenManagePage/ImageUpload";

const Media = () => {
  const { metadata } = useTokenProvider();
  const { name, description, setName, setDescription, imageUri, setImageUri } =
    useMomentManageProvider();
  const { data: meta, isLoading } = metadata;

  useEffect(() => {
    if (!meta) return;
    if (!name) setName(meta.name || "");
    if (!description) setDescription(meta.description || "");
    if (!imageUri) setImageUri(meta.image || "");
  }, [meta, name, description, setName, setDescription, imageUri, setImageUri]);

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
              value={name}
              onChange={(e) => setName(e.target.value)}
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

          <ImageUpload />
          <SaveMediaButton />
          <OwnerWarning />
        </div>
      </div>
    </div>
  );
};

export default Media;
