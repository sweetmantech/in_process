import { NextRequest } from "next/server";
import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  const arweaveURI = await clientUploadToArweave(file);
  return Response.json(arweaveURI, { status: 200 });
}
