"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, Loader2 } from "lucide-react";
import { useApiKeyProvider } from "@/providers/ApiKeyProvider";
import { toast } from "sonner";
import { ApiKeyModal } from "./ApiKeyModal";

export function ApiKeyForm() {
  const { createApiKey, apiKey, showApiKeyModal, setShowApiKeyModal, apiKeys } =
    useApiKeyProvider();
  const [keyName, setKeyName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyName.trim()) {
      toast.error("Please enter a name for your API key");
      return;
    }
    setIsCreating(true);
    await createApiKey(keyName.trim());
    setIsCreating(false);
    setKeyName("");
  };

  return (
    <div className="space-y-4">
      {apiKeys.length >= 5 && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="font-archivo-medium text-sm text-red-800">
            Maximum 5 API keys reached. Please delete an existing key to create a new one.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="keyName" className="font-archivo-medium text-grey-moss-900">
            API Key Name
          </Label>
          <Input
            id="keyName"
            type="text"
            placeholder="e.g., My Production Key"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            className="mt-1"
            disabled={isCreating || apiKeys.length >= 5}
          />
          <p className="mt-1 font-spectral-italic text-xs text-grey-secondary">
            Choose a descriptive name to identify this API key
          </p>
        </div>

        <Button
          type="submit"
          className="flex w-full items-center gap-2 rounded-md bg-grey-moss-900 px-4 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900 disabled:cursor-not-allowed disabled:bg-grey-moss-300"
          disabled={isCreating || !keyName.trim() || apiKeys.length >= 5}
        >
          {isCreating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating API Key...
            </>
          ) : (
            <>
              <Key className="h-4 w-4" />
              Create API Key
            </>
          )}
        </Button>
      </form>

      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        apiKey={apiKey || ""}
      />
    </div>
  );
}
