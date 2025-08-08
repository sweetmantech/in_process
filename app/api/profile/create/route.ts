import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return Response.json({
    success: true,
  });
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
