import { NextRequest } from "next/server";
import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import getCorsHeader from "@/lib/getCorsHeader";

// CORS headers for allowing cross-origin requests
const corsHeaders = getCorsHeader();

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  const arweaveURI = await clientUploadToArweave(file);
  return Response.json(arweaveURI, { status: 200 });
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
