# API Key Security System

This system provides secure API key generation, storage, and validation for the in_process application.

## Security Features

- **CSPRNG Generation**: Uses Node.js `crypto.randomBytes()` for cryptographically secure random key generation
- **HMAC-SHA256 Hashing**: Keys are hashed using HMAC-SHA256 with a project secret before storage
- **One-time Display**: Raw keys are only shown once during creation, never stored or logged
- **Secure Storage**: Only hashed versions are stored in the database
- **Key Rotation**: Project secret can be rotated to invalidate all keys

## Key Format

Generated keys follow the format: `<prefix>_<base64url(32b)>`

Example: `art_pk_AbCdEfGhIjKlMnOpQrStUvWxYz1234567890`

## Environment Variables

Add to your `.env.local` and Vercel environment:

```bash
API_KEY_PROJECT_SECRET=your-super-secret-key-here-rotate-regularly
```

**Important**: 
- Use a strong, random secret (32+ characters)
- Rotate this secret regularly to invalidate all existing keys
- Never commit this secret to version control

## API Endpoints

### Create API Key
```http
POST /api/artists/api-keys
Content-Type: application/json

{
  "name": "My API Key",
  "artist_address": "0x1234567890123456789012345678901234567890"
}
```

**Response:**
```json
{
  "success": true,
  "api_key": "art_pk_AbCdEfGhIjKlMnOpQrStUvWxYz1234567890",
  "key_id": "uuid-here",
  "name": "My API Key",
  "created_at": "2024-01-01T00:00:00Z"
}
```

### List API Keys
```http
GET /api/artists/api-keys?artist_address=0x1234567890123456789012345678901234567890
```

**Response:**
```json
{
  "success": true,
  "keys": [
    {
      "id": "uuid-here",
      "name": "My API Key",
      "created_at": "2024-01-01T00:00:00Z",
      "last_used": "2024-01-01T12:00:00Z"
    }
  ]
}
```

### Delete API Key
```http
DELETE /api/artists/api-keys
Content-Type: application/json

{
  "key_id": "uuid-here",
  "artist_address": "0x1234567890123456789012345678901234567890"
}
```

## Protecting Routes

Use the authentication middleware to protect API routes:

```typescript
import { requireApiKey } from "@/lib/auth/apiKeyAuth";

export async function GET(req: NextRequest) {
  // Check API key authentication
  const authError = await requireApiKey(req);
  if (authError) {
    return authError; // Returns 401 if invalid
  }

  // Your protected logic here
  return Response.json({ success: true });
}
```

## Client Usage

### Using Authorization Header
```javascript
fetch('/api/protected-endpoint', {
  headers: {
    'Authorization': 'Bearer art_pk_AbCdEfGhIjKlMnOpQrStUvWxYz1234567890'
  }
});
```

### Using X-API-Key Header
```javascript
fetch('/api/protected-endpoint', {
  headers: {
    'X-API-Key': 'art_pk_AbCdEfGhIjKlMnOpQrStUvWxYz1234567890'
  }
});
```

## Security Considerations

1. **Never log raw API keys** - They are only returned once during creation
2. **Rotate project secret regularly** - This invalidates all existing keys
3. **Use HTTPS only** - API keys should never be transmitted over HTTP
4. **Monitor usage** - Track `last_used` timestamps for security monitoring
5. **Implement rate limiting** - Consider rate limiting based on API key usage
6. **Key expiration** - Consider implementing key expiration policies

## Database Schema

The system uses the `in_process_api_keys` table:

```sql
CREATE TABLE in_process_api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  artist_address TEXT REFERENCES in_process_artists(address),
  key_hash TEXT NOT NULL, -- HMAC-SHA256 hash of the raw key
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_used TIMESTAMP WITHOUT TIME ZONE
);
```

## Key Rotation Process

To rotate the project secret and invalidate all keys:

1. Generate a new `API_KEY_PROJECT_SECRET`
2. Update the environment variable
3. All existing keys will become invalid
4. Users must create new API keys
5. Update your application to use the new secret

This ensures complete key invalidation in case of a security breach.
