import { NextRequest } from "next/server";
import getCorsHeader from "@/lib/getCorsHeader";
import { momentMigratePostHandler } from "@/lib/moment/momentMigratePostHandler";

// CORS headers for allowing cross-origin requests
const corsHeaders = getCorsHeader();

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(req: NextRequest) {
  return momentMigratePostHandler(req);
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
