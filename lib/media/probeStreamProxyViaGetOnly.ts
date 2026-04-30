import isMisleadingPlaybackContentType from "@/lib/media/isMisleadingPlaybackContentType";

const probeStreamProxyViaGetOnly = async (
  url: string,
  timeoutMs: number,
  raceSignal?: AbortSignal
): Promise<{ url: string; ms: number } | null> => {
  if (raceSignal?.aborted) return null;
  const start = performance.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const onRaceAbort = () => controller.abort();
  if (raceSignal) raceSignal.addEventListener("abort", onRaceAbort, { once: true });
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Range: "bytes=0-0" },
      signal: controller.signal,
      cache: "no-store",
    });

    if (!res.ok) return null;
    const ct = res.headers.get("content-type");
    if (isMisleadingPlaybackContentType(ct)) return null;
    const contentLength = res.headers.get("content-length");
    if (res.status === 206 && contentLength === "0") return null;

    if (res.body) void res.body.cancel().catch(() => {});

    return { url, ms: performance.now() - start };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
    raceSignal?.removeEventListener("abort", onRaceAbort);
  }
};

export default probeStreamProxyViaGetOnly;
