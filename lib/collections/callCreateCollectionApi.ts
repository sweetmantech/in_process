import type { CreateCollectionInput, CreateCollectionResult } from "@/types/collections";

export async function callCreateCollectionApi(
  accessToken: string,
  input: CreateCollectionInput
): Promise<CreateCollectionResult> {
  const response = await fetch("/api/collections", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
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
