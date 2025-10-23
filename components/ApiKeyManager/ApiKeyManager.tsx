"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Key, RefreshCw } from 'lucide-react';
import useApiKey from '@/hooks/useApiKey';
import useUser from '@/hooks/useUser';
import { ApiKeyForm } from './ApiKeyForm';
import { ApiKeyDisplay } from './ApiKeyDisplay';

interface ApiKeyManagerProps {
  className?: string;
}

export default function ApiKeyManager({ className }: ApiKeyManagerProps) {
  const { apiKey, isLoading, error, createApiKey, updateApiKey, refreshApiKey } = useApiKey();
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="font-archivo-bold text-grey-moss-900 flex items-center gap-2">
          <Key className="h-5 w-5" />
          API Key Manager
        </CardTitle>
        <CardDescription className="font-spectral-italic text-grey-secondary">
          {apiKey 
            ? 'Manage your API key for programmatic access to In Process'
            : 'Create an API key to access In Process programmatically'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {apiKey ? (
          <ApiKeyDisplay 
            apiKey={apiKey}
            showApiKey={showApiKey}
            copied={copied}
            onToggleVisibility={() => setShowApiKey(!showApiKey)}
            onCopy={() => {
              navigator.clipboard.writeText(apiKey.apiKey);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            onUpdate={updateApiKey}
          />
        ) : (
          <ApiKeyForm 
            onCreate={createApiKey}
            isLoading={isLoading}
          />
        )}
      </CardContent>
    </Card>
  );
}
