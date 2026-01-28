import type { CreateCollectionInput, CreateCollectionResult } from "@/types/collections";
import { IN_PROCESS_API } from "@/lib/consts";

export async function callCreateCollectionApi(
  input: CreateCollectionInput
): Promise<CreateCollectionResult> {
  const response = await fetch(`${IN_PROCESS_API}/collections`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create collection");
  }

  const result = await response.json();
  return result;
}
