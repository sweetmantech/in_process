/**
 * Measures time-to-response for HEAD, then GET Range bytes=0-0 if HEAD is not usable.
 * When `raceSignal` aborts (e.g. another gateway won), the probe stops and resolves null.
 */
const probeUrlResponseTime = async (
  url: string,
  timeoutMs = 8000,
  raceSignal?: AbortSignal
): Promise<{ url: string; ms: number } | null> => {
  const run = async (init: RequestInit): Promise<{ url: string; ms: number } | null> => {
    if (raceSignal?.aborted) return null;
    const start = performance.now();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const onRaceAbort = () => controller.abort();
    if (raceSignal) raceSignal.addEventListener("abort", onRaceAbort, { once: true });
    try {
      const res = await fetch(url, { ...init, signal: controller.signal, cache: "no-store" });
      if (init.method === "HEAD" && !res.ok) return null;
      if (init.method === "GET" && !res.ok && res.status !== 206) return null;
      return { url, ms: performance.now() - start };
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
      raceSignal?.removeEventListener("abort", onRaceAbort);
    }
  };

  const head = await run({ method: "HEAD" });
  if (raceSignal?.aborted) return null;
  if (head) return head;
  return run({
    method: "GET",
    headers: { Range: "bytes=0-0" },
  });
};

export default probeUrlResponseTime;
