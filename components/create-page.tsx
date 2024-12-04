"use client";

import { useZoraCreate } from "@/providers/zora-create-provider";
import { useState } from "react";
import MediaUpload from "./media-upload/media-upload";

interface CreatePageProps {
  className?: string;
  onSuccess?: (tokenId: string) => void;
  defaultValues?: CreatePageDefaultValues;
  theme?: CreatePageTheme;
}

interface CreatePageDefaultValues {
  name?: string;
  description?: string;
  symbol?: string;
}

interface CreatePageTheme {
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
  };
  borderRadius?: string;
  fontFamily?: string;
}

export function CreatePage({
  className = "",
  onSuccess,
  defaultValues,
  theme,
}: CreatePageProps) {
  const {
    createToken,
    isLoading: isCreating,
    error: createError,
  } = useZoraCreate();
  const [formData, setFormData] = useState({
    name: defaultValues?.name || "",
    symbol: defaultValues?.symbol || "",
    description: defaultValues?.description || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tokenId = await createToken({
        ...formData,
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
            Media
            <MediaUpload />
          </label>
        </div>

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

        <button
          type="submit"
          disabled={isCreating}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isCreating ? "Creating..." : "Create Token"}
        </button>

        {createError && <p className="text-red-500">{createError.message}</p>}
      </form>
    </div>
  );
}
