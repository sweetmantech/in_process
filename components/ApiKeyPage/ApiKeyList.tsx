"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useApiKeyProvider } from "@/providers/ApiKeyProvider";

export function ApiKeyList() {
  const { apiKeys, loadingKeys, deleteApiKey } = useApiKeyProvider();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loadingKeys) {
    return (
      <div className="space-y-4">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-grey-moss-900 mx-auto"></div>
          <p className="text-grey-secondary mt-2">Loading API keys...</p>
        </div>
      </div>
    );
  }

  if (apiKeys.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-grey-secondary font-spectral-italic">
          No API keys found. Create your first API key above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-amber-800 text-sm font-archivo-medium">
          {`We don't store your API keys. Please be sure to store them somewhere safe! Maximum 5 keys
          per artist.`}
        </p>
      </div>

      <div className="space-y-3">
        {apiKeys.map((key) => (
          <div key={key.id} className="border border-grey-secondary rounded-lg p-4 bg-white">
            <div className="flex items-center gap-3">
              <Input
                value={`${key.name}: ***************`}
                readOnly
                className="flex-1 font-mono text-sm bg-grey-eggshell border-grey-secondary text-grey-moss-600"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => deleteApiKey(key.id)}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs font-spectral-italic text-grey-secondary mt-2">
              Created {formatDate(key.created_at)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
