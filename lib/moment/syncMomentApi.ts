export interface SyncMomentResult {
  success: boolean;
  result: string[];
}

export async function syncMomentApi(): Promise<SyncMomentResult> {
  const response = await fetch("/api/sync", {
    method: "POST",
    headers: { "content-type": "application/json" },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to sync moment");
  }

  const result = await response.json();
  return result;
}
