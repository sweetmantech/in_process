"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
}

export function ApiKeyModal({ isOpen, onClose, apiKey }: ApiKeyModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      toast.success("API key copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (error: any) {
      toast.error(error.message || "Failed to copy API key");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-archivo-bold text-grey-moss-900">
            API Key Created Successfully
          </DialogTitle>
          <DialogDescription className="font-spectral text-grey-secondary">
            {`Your API key has been generated. Please copy it now as you won't be able to see it
            again.`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey" className="font-archivo-medium text-grey-moss-900">
              Your API Key
            </Label>
            <div className="flex gap-2">
              <Input id="apiKey" value={apiKey} readOnly className="font-mono text-sm" />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="px-3"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
              <div>
                <p className="font-archivo-medium text-sm text-amber-800">
                  Important Security Notice
                </p>
                <p className="mt-1 font-spectral text-sm text-amber-700">
                  {`We don't store app secrets, so this is the only time you can copy it. If you lose
                    it, you'll need to reset it.`}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-grey-moss-900 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900"
            >
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
