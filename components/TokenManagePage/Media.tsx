"use client";

import { useTokenProvider } from "@/providers/TokenProvider";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MediaSkeleton from "./MediaSkeleton";

const Media = () => {
  const { metadata } = useTokenProvider();
  const { data: meta, isLoading } = metadata;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!meta) return;
    if (!title) setTitle(meta.name || "");
    if (!description) setDescription(meta.description || "");
  }, [meta, title, description]);

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
        </div>
      </div>
    </div>
  );
};

export default Media;
