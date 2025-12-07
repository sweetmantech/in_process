"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Key } from "lucide-react";
import { ApiKeyForm } from "./ApiKeyForm";
import { ApiKeyList } from "./ApiKeyList";

interface ApiKeyManagerProps {
  className?: string;
}

export default function ApiKeyManager({ className }: ApiKeyManagerProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-archivo-bold text-grey-moss-900">
          <Key className="h-5 w-5" />
          API Key Manager
        </CardTitle>
        <CardDescription className="font-spectral-italic text-grey-secondary">
          Create an API key to access In Process programmatically.{" "}
          <a
            href="https://in-process-docs.vercel.app/"
            className="text-blue-600 underline hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            View docs here.
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ApiKeyForm />
        <div className="border-t border-grey-secondary pt-6">
          <h3 className="mb-4 font-archivo-medium text-grey-moss-900">API Keys</h3>
          <ApiKeyList />
        </div>
      </CardContent>
    </Card>
  );
}
