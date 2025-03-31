import uploadPfpToArweave from "@/lib/arweave/uploadToArweave";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  const arweaveURI = await uploadPfpToArweave(file);
  return Response.json(arweaveURI, { status: 200 });
}
