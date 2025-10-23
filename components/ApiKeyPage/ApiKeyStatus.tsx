"use client";

import { useApiKeyProvider } from "@/providers/ApiKeyProvider";
import { Key, Loader2, AlertCircle } from "lucide-react";

/**
 * Example component showing how to use the ApiKeyProvider
 * This component can be used anywhere in the app without importing the hook directly
 */
export function ApiKeyStatus() {
  const { apiKey, isLoading, error } = useApiKeyProvider();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-grey-secondary">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading API key...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-sm text-red-600">
        <AlertCircle className="h-4 w-4" />
        Error: {error}
      </div>
    );
  }

  if (apiKey) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600">
        <Key className="h-4 w-4" />
        API Key: {apiKey.keyName}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-grey-secondary">
      <Key className="h-4 w-4" />
      No API key found
    </div>
  );
}
