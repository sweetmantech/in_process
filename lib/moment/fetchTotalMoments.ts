/**
 * Fetches total moments count from API.
 */
export async function fetchTotalMoments(): Promise<number> {
  const res = await fetch("/api/moment/total-cnt");
  if (!res.ok) throw new Error("Failed to fetch total moments count");
  const data = await res.json();
  return data.total;
}
