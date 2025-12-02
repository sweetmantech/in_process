import { NextRequest } from "next/server";
import getCorsHeader from "@/lib/getCorsHeader";
import { authMiddleware } from "@/middleware/authMiddleware";
import { tasks } from "@trigger.dev/sdk";
import { triggerMuxToArweaveSchema } from "@/lib/schema/triggerMuxToArweaveSchema";

const corsHeaders = getCorsHeader();

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req, { corsHeaders });
    if (authResult instanceof Response) {
      return authResult;
    }
    const { artistAddress } = authResult;

    const body = await req.json();
    const parseResult = triggerMuxToArweaveSchema.safeParse(body);

    if (!parseResult.success) {
      const errorDetails = parseResult.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return Response.json(
        { message: "Invalid input", errors: errorDetails },
        { status: 400, headers: corsHeaders }
      );
    }

    const { collectionAddress, tokenIds, chainId } = parseResult.data;

    // Trigger the migration task
    const handle = await tasks.trigger("migrate-mux-to-arweave", {
      collectionAddress: collectionAddress as `0x${string}`,
      tokenIds,
      chainId,
      artistAddress: artistAddress as `0x${string}`,
    });

    return Response.json(
      {
        success: true,
        runId: handle.id,
        message: `Migration task triggered successfully for ${tokenIds.length} token(s)`,
      },
      { headers: corsHeaders }
    );
  } catch (e: any) {
    console.error("Error triggering MUX to Arweave migration:", e);
    const message = e?.message ?? "Failed to trigger MUX to Arweave migration";
    return Response.json({ message, success: false }, { status: 500, headers: corsHeaders });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
