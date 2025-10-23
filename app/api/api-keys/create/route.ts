import { NextRequest } from 'next/server';
import { createApiKey } from '@/lib/supabase/api-keys/createApiKey';
import { withWalletAuth } from '@/lib/api-key/wallet-auth';
import { CreateApiKeyRequest } from '@/types/api-key';
import getCorsHeader from '@/lib/getCorsHeader';

const corsHeaders = getCorsHeader();

// POST /api/api-keys/create - Create initial API key using wallet signature
// This endpoint is for new artists who don't have an API key yet
export async function POST(req: NextRequest) {
  return withWalletAuth(async (authenticatedReq) => {
    try {
      const body = await req.json();
      
      // Validate required fields
      if (!body.keyName) {
        return Response.json(
          { success: false, error: 'keyName is required' },
          { status: 400, headers: corsHeaders }
        );
      }

      const createRequest: CreateApiKeyRequest = {
        keyName: body.keyName,
      };

      // Use the wallet address from signature verification
      const result = await createApiKey(authenticatedReq.walletAddress!, createRequest);
      
      return Response.json({
        success: true,
        apiKey: result,
      }, { headers: corsHeaders });
    } catch (error: any) {
      console.error('Error creating API key:', error);
      return Response.json(
        { success: false, error: error.message || 'Failed to create API key' },
        { status: 500, headers: corsHeaders }
      );
    }
  })(req);
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
