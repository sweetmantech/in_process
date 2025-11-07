export interface SyncMomentResult {
  success: boolean;
  result: string[];
}

export async function syncMomentApi(accessToken: string): Promise<SyncMomentResult> {
  try {
    const response = await fetch("/api/sync", {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to sync moment");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return { success: false, result: [] };
  }
}
