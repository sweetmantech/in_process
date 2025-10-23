# API Key System Usage

## API Key Flow for New Artists

The API key system provides two ways to create API keys depending on whether you're a new artist or have an existing API key.

### For New Artists (No Existing API Key)

New artists need to create their first API key using wallet signature authentication:

#### 1. Get Message to Sign

```javascript
import { ApiKeyClient } from '@/lib/api-key/client-utils';

const message = ApiKeyClient.getSignMessage(artistAddress);
// Returns: "Sign this message to create your In Process API key.\n\nArtist Address: 0x...\nTimestamp: 1234567890\n\n..."
```

#### 2. Sign Message with Wallet

```javascript
// Using ethers.js
const signature = await wallet.signMessage(message);

// Using viem
const signature = await walletClient.signMessage({
  account: walletAddress,
  message: message,
});
```

#### 3. Create Initial API Key

```javascript
const result = await ApiKeyClient.createInitialApiKey(
  artistAddress,
  signature,
  'My First API Key'
);

if (result.success) {
  console.log('API Key created:', result.apiKey);
} else {
  console.error('Error:', result.error);
}
```

**POST** `/api/api-keys/create`

```bash
curl -X POST https://your-domain.com/api/api-keys/create \
  -H "Content-Type: application/json" \
  -d '{
    "artistAddress": "0x123...",
    "signature": "0xabc123...",
    "keyName": "My Production Key"
  }'
```

### For Existing Artists (Have API Key)

Existing artists can create/update API keys using their current API key:

#### 1. Update API Key

```javascript
const result = await ApiKeyClient.updateApiKey(
  existingApiKey,
  'Updated API Key Name'
);
```

**POST** `/api/api-keys`

```bash
curl -X POST https://your-domain.com/api/api-keys \
  -H "x-api-key: YOUR_EXISTING_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "keyName": "My Production Key"
  }'
```

**Response:**
```json
{
  "success": true,
  "apiKey": {
    "id": "uuid",
    "apiKey": "ip_abc123...",
    "keyName": "My Production Key",
    "artistAddress": "0x...",
    "isActive": true,
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

### 2. Get API Key

**GET** `/api/api-keys`

```bash
curl -X GET https://your-domain.com/api/api-keys \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "success": true,
  "apiKey": {
    "id": "uuid",
    "keyName": "My Production Key",
    "apiKeyPrefix": "ip_abc123",
      "artistAddress": "0x...",
      "isActive": true,
      "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
}
```

### 3. Use API Key in Requests

**Authorization Header:**
```bash
curl -X GET https://your-domain.com/api/timeline \
  -H "Authorization: Bearer ip_abc123..."
```

**X-API-Key Header:**
```bash
curl -X GET https://your-domain.com/api/timeline \
  -H "X-API-Key: ip_abc123..."
```

## How Artist Assignment Works

1. **Artist Authentication**: The API key system uses the existing artist authentication flow
2. **One API Key Per Artist**: Each artist can have only one API key
3. **API Key Creation**: When an artist creates an API key, it replaces any existing key
4. **Database Relationship**: API keys are linked to artists via foreign key relationship
5. **Access Control**: Artists can only see and manage their own API key

## Middleware Protection

Any endpoint can be protected with API key authentication:

```typescript
import { withApiKeyAuth } from '@/lib/api-key/middleware';

export const GET = withApiKeyAuth(async (req) => {
  // This endpoint is now protected by API key authentication
  return Response.json({ data: 'protected data' });
});
```

## Key Features

- **Simple**: Just create and use API keys
- **Secure**: API keys are hashed in database, only shown once on creation
- **One Per Artist**: Each artist can have only one API key
- **Artist Scoped**: Each artist can only access their own API key
