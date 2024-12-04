"use client";

import { useZoraCreate } from "@/providers/zora-create-provider";
import { useMediaUpload } from "@/hooks/use-media-upload";
import { useState } from "react";

interface CreatePageProps {
  className?: string;
  onSuccess?: (tokenId: string) => void;
  defaultValues?: CreatePageDefaultValues;
}

interface CreatePageDefaultValues {
  name?: string;
  description?: string;
  symbol?: string;
  sellerFeeBasisPoints?: number;
}

export function CreatePage({
  className = "",
  onSuccess,
  defaultValues,
}: CreatePageProps) {
  const {
    createToken,
    isLoading: isCreating,
    error: createError,
  } = useZoraCreate();
  const { uploadMedia, isUploading, error: uploadError } = useMediaUpload();
  const [mediaUrl, setMediaUrl] = useState("");
  const [formData, setFormData] = useState({
    name: defaultValues?.name || "",
    symbol: defaultValues?.symbol || "",
    description: defaultValues?.description || "",
    sellerFeeBasisPoints: defaultValues?.sellerFeeBasisPoints || 0,
  });

  const handleMediaChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadMedia(file);
      setMediaUrl(url);
    } catch (err) {
      console.error("Failed to upload media:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tokenId = await createToken({
        ...formData,
        mediaUrl,
      });
      onSuccess?.(tokenId);
    } catch (err) {
      console.error("Failed to create token:", err);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Symbol
            <input
              type="text"
              value={formData.symbol}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, symbol: e.target.value }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Royalty (%)
            <input
              type="number"
              value={formData.sellerFeeBasisPoints / 100}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  sellerFeeBasisPoints: Math.floor(
                    parseFloat(e.target.value) * 100
                  ),
                }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              min="0"
              max="100"
              step="0.01"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Media
            <input
              type="file"
              onChange={handleMediaChange}
              className="mt-1 block w-full"
              accept="image/*,video/*,audio/*"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isCreating || isUploading}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isUploading
            ? "Uploading..."
            : isCreating
            ? "Creating..."
            : "Create Token"}
        </button>

        {(createError || uploadError) && (
          <p className="text-red-500">
            {createError?.message || uploadError?.message}
          </p>
        )}
      </form>
    </div>
  );
}
