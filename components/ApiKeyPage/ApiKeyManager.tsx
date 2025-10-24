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
        <CardTitle className="font-archivo-bold text-grey-moss-900 flex items-center gap-2">
          <Key className="h-5 w-5" />
          API Key Manager
        </CardTitle>
        <CardDescription className="font-spectral-italic text-grey-secondary">
          Create an API key to access In Process programmatically
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ApiKeyForm />
        <div className="border-t border-grey-secondary pt-6">
          <h3 className="font-archivo-medium text-grey-moss-900 mb-4">API Keys</h3>
          <ApiKeyList />
        </div>
      </CardContent>
    </Card>
  );
}
