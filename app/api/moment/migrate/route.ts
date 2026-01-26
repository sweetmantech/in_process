import { NextRequest } from "next/server";
import getCorsHeader from "@/lib/getCorsHeader";
import { authMiddleware } from "@/middleware/authMiddleware";
import { selectSocialWallets } from "@/lib/supabase/in_process_artist_social_wallets/selectSocialWallets";
import { Address } from "viem";
import selectCollections from "@/lib/supabase/in_process_collections/selectCollections";
import { getOrCreateSmartWallet } from "@/lib/coinbase/getOrCreateSmartWallet";
import migrateMoments from "@/lib/moment/migrateMoments";
import { CHAIN_ID } from "@/lib/consts";

// CORS headers for allowing cross-origin requests
const corsHeaders = getCorsHeader();

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(req: NextRequest) {
  try {
    const { chainId } = await req.json();
    const authResult = await authMiddleware(req, { corsHeaders });
    if (authResult instanceof Response) {
      return authResult;
    }
    const { artistAddress } = authResult;

    const { data: socials, error: socialError } = await selectSocialWallets({
      artistAddress: artistAddress as Address,
    });
    if (socialError) {
      return Response.json({ message: socialError.message }, { status: 500, headers: corsHeaders });
    }
    if (!socials) {
      return Response.json({ message: "no socials found" }, { status: 404, headers: corsHeaders });
    }

    const smartAccount = await getOrCreateSmartWallet({
      address: artistAddress as Address,
    });

    const transactions = [];
    for (const social of socials) {
      const { data: collections, error: collectionError } = await selectCollections({
        artists: [social.social_wallet as Address],
      });
      if (!collectionError && collections && collections.length > 0) {
        const transaction = await migrateMoments({
          collections,
          socialWallet: social.social_wallet as Address,
          artistWallet: {
            address: artistAddress as Address,
            smartWalletAddress: smartAccount.address as Address,
          },
          chainId: chainId || CHAIN_ID,
        });
        if (transaction) transactions.push(transaction);
      }
    }

    return Response.json(
      {
        message: "success",
        results: transactions,
      },
      { headers: corsHeaders }
    );
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to migrate moments";
    return Response.json({ message }, { status: 500, headers: corsHeaders });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
