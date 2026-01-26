export interface MigrateMomentsApiInput {
  chainId?: number;
}

export interface MigrateMomentsApiResult {
  message: string;
  results: any[];
}

/**
 * Client-side API call to migrate moments
 */
export async function migrateMomentsApi(
  input: MigrateMomentsApiInput,
  accessToken: string
): Promise<MigrateMomentsApiResult> {
  const response = await fetch("/api/moment/migrate", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to migrate moments");
  }

  const data = await response.json();

  return data;
}
