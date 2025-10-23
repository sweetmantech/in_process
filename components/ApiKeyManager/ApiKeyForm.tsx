"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Key, Loader2 } from 'lucide-react';

interface ApiKeyFormProps {
  onCreate: (keyName: string) => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
}

export function ApiKeyForm({ onCreate, isLoading }: ApiKeyFormProps) {
  const [keyName, setKeyName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!keyName.trim()) {
      setError('Please enter a name for your API key');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const result = await onCreate(keyName.trim());
      
      if (!result.success) {
        setError(result.error || 'Failed to create API key');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to create API key');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-grey-moss-50 border border-grey-secondary rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Key className="h-5 w-5 text-grey-moss-600 mt-0.5" />
          <div>
            <h3 className="font-archivo-medium text-grey-moss-900 mb-1">
              Create Your First API Key
            </h3>
            <p className="font-spectral text-grey-secondary text-sm">
              You'll need to sign a message with your wallet to create an API key. 
              This proves you control the wallet and allows you to access In Process programmatically.
            </p>
          </div>
        </div>
      </div>

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
            disabled={isCreating}
          />
          <p className="text-xs text-grey-secondary mt-1">
            Choose a descriptive name to identify this API key
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button 
          type="submit" 
          className="w-full px-4 py-2 rounded-md flex items-center gap-2 bg-grey-moss-900 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900 disabled:bg-grey-moss-300 disabled:cursor-not-allowed" 
          disabled={isCreating || !keyName.trim()}
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

      <div className="text-xs text-grey-secondary space-y-1">
        <p><strong>What happens next:</strong></p>
        <ol className="list-decimal list-inside space-y-1 ml-2">
          <li>You'll be prompted to sign a message with your wallet</li>
          <li>Your API key will be created and displayed</li>
          <li>You can use this key to access In Process APIs</li>
        </ol>
      </div>
    </div>
  );
}
