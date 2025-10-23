import { NextRequest } from 'next/server';
import { getApiKeyByArtist } from '@/lib/supabase/api-keys/getApiKeysByArtist';
import { withWalletAuth } from '@/lib/api-key/wallet-auth';
import getCorsHeader from '@/lib/getCorsHeader';

const corsHeaders = getCorsHeader();

// This endpoint is for artists who want to fetch their existing API key
export async function POST(req: NextRequest) {
  return withWalletAuth(async (authenticatedReq) => {
    try {
      const apiKey = await getApiKeyByArtist(authenticatedReq.walletAddress!);
      
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

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
