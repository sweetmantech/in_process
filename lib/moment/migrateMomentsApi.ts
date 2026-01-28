import { MigrateMomentsApiInput, MigrateMomentsApiResult } from "@/types/moment";
import { IN_PROCESS_API } from "@/lib/consts";

/**
 * Client-side API call to migrate moments
 */
export async function migrateMomentsApi(
  input: MigrateMomentsApiInput,
  accessToken: string
): Promise<MigrateMomentsApiResult> {
  const response = await fetch(`${IN_PROCESS_API}/moment/migrate`, {
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
