// The Turbo web SDK passes ReadableStream as fetch body which browsers mark as
// "disturbed" after the first read. Intercept those calls and convert to Blob
// so the body can be reused across SDK retries.
const patchFetch = (): (() => void) => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    if (init?.body instanceof ReadableStream) {
      const blob = await new Response(init.body).blob();
      const { duplex: _duplex, ...rest } = init as RequestInit & { duplex?: string };
      return originalFetch(input, { ...rest, body: blob });
    }
    return originalFetch(input, init);
  };
  return () => {
    globalThis.fetch = originalFetch;
  };
};

export default patchFetch;
