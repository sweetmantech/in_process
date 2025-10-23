import { NextRequest } from 'next/server';
import { createApiKey } from '@/lib/supabase/api-keys/createApiKey';
import { getApiKeyByArtist } from '@/lib/supabase/api-keys/getApiKeysByArtist';
import { withApiKeyAuth } from '@/lib/api-key/middleware';
import { withWalletAuth } from '@/lib/api-key/wallet-auth';
import { CreateApiKeyRequest } from '@/types/api-key';
import getCorsHeader from '@/lib/getCorsHeader';

const corsHeaders = getCorsHeader();

// GET /api/api-keys - Get the API key for the authenticated artist
export async function GET(req: NextRequest) {
  return withApiKeyAuth(async (authenticatedReq) => {
    try {
      const apiKey = await getApiKeyByArtist(authenticatedReq.apiKey!.artistAddress);
      
      return Response.json({
        success: true,
        apiKey,
      }, { headers: corsHeaders });
    } catch (error: any) {
      console.error('Error fetching API key:', error);
      return Response.json(
        { success: false, error: 'Failed to fetch API key' },
        { status: 500, headers: corsHeaders }
      );
    }
  })(req);
}

// POST /api/api-keys - Create or replace API key (one per artist)
// This endpoint requires existing API key authentication
export async function POST(req: NextRequest) {
  return withApiKeyAuth(async (authenticatedReq) => {
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

      const result = await createApiKey(authenticatedReq.apiKey!.artistAddress, createRequest);
      
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
