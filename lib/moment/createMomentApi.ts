export interface CreateMomentParameters {
  // Add the actual parameter types based on what fetchParameters returns
  [key: string]: any;
}

export interface CreateMomentResult {
  contractAddress: string;
  tokenId: number;
}

export async function createMomentApi(
  parameters: CreateMomentParameters
): Promise<CreateMomentResult> {
  const response = await fetch("/api/moment/create", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(parameters),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create moment");
  }

  const result = await response.json();
  return result;
}
