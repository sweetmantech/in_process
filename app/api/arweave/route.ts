import uploadToArweave from "@/lib/arweave/uploadToArweave";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  if (!request.body) {
    return Response.json({ error: "No file provided." }, { status: 400 });
  }
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    totalBytes += value.length;
  }

  const fileBuffer = new Uint8Array(totalBytes);
  let position = 0;
  for (const chunk of chunks) {
    fileBuffer.set(chunk, position);
    position += chunk.length;
  }

  const file = new File([fileBuffer], "uploadedFile");
  const arweaveURI = await uploadToArweave(file);
  return Response.json(arweaveURI, { status: 200 });
}
