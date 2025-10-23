"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, Eye, EyeOff, Key, RefreshCw, Check, Edit3 } from 'lucide-react';

interface ApiKeyData {
  id: string;
  apiKey: string;
  keyName: string;
  artistAddress: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiKeyDisplayProps {
  apiKey: ApiKeyData;
  showApiKey: boolean;
  copied: boolean;
  onToggleVisibility: () => void;
  onCopy: () => void;
  onUpdate: (keyName: string) => Promise<{ success: boolean; error?: string }>;
}

export function ApiKeyDisplay({ 
  apiKey, 
  showApiKey, 
  copied, 
  onToggleVisibility, 
  onCopy, 
  onUpdate 
}: ApiKeyDisplayProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newKeyName, setNewKeyName] = useState(apiKey.keyName);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newKeyName.trim()) {
      setError('Please enter a name for your API key');
      return;
    }

    setIsUpdating(true);
    setError(null);

    try {
      const result = await onUpdate(newKeyName.trim());
      
      if (result.success) {
        setIsEditing(false);
      } else {
        setError(result.error || 'Failed to update API key');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to update API key');
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      {/* API Key Info */}
      <div className="bg-grey-moss-50 border border-grey-secondary rounded-lg p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-grey-moss-600" />
            <div>
              <h3 className="font-archivo-medium text-grey-moss-900">
                {isEditing ? 'Edit API Key Name' : apiKey.keyName}
              </h3>
              <p className="text-xs text-grey-secondary">
                Created {formatDate(apiKey.createdAt)}
              </p>
            </div>
          </div>
          {!isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="text-grey-secondary hover:text-grey-moss-900"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-3">
            <div>
              <Label htmlFor="newKeyName" className="font-archivo-medium text-grey-moss-900">
                API Key Name
              </Label>
              <Input
                id="newKeyName"
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="mt-1"
                disabled={isUpdating}
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button
                type="submit"
                size="sm"
                disabled={isUpdating || !newKeyName.trim()}
              >
                {isUpdating ? (
                  <>
                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Save'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsEditing(false);
                  setNewKeyName(apiKey.keyName);
                  setError(null);
                }}
                disabled={isUpdating}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-3">
            {/* API Key Value */}
            <div>
              <Label className="font-archivo-medium text-grey-moss-900">
                API Key
              </Label>
              <div className="flex gap-2 mt-1">
                <Input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey.apiKey}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onToggleVisibility}
                  className="shrink-0"
                >
                  {showApiKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onCopy}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-grey-secondary mt-1">
                {copied ? 'Copied to clipboard!' : 'Click to copy your API key'}
              </p>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${apiKey.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm font-spectral text-grey-secondary">
                {apiKey.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Usage Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-archivo-medium text-blue-900 mb-2">How to Use Your API Key</h4>
        <div className="space-y-2 text-sm text-blue-800">
          <p><strong>Include in requests:</strong></p>
          <div className="bg-blue-100 p-2 rounded font-mono text-xs">
            <div>curl -H "x-api-key: {apiKey.apiKey.substring(0, 20)}..." \</div>
            <div className="ml-4">https://your-domain.com/api/endpoint</div>
          </div>
          <p className="text-xs">
            Replace the API key with your full key in all API requests
          </p>
        </div>
      </div>
    </div>
  );
}
