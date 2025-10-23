"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Key } from "lucide-react";
import { ApiKeyForm } from "./ApiKeyForm";

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
      <CardContent className="space-y-4">
        <ApiKeyForm />
      </CardContent>
    </Card>
  );
}
