import { CreateCollectionInput, CreateCollectionResult } from "@/types/collections";

export async function createCollectionApi(
  input: CreateCollectionInput
): Promise<CreateCollectionResult> {
  const response = await fetch("/api/collections", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create collection");
  }

  const result = await response.json();
  return result;
}
