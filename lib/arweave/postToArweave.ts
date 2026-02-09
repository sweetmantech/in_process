import { IN_PROCESS_API } from "@/lib/consts";

const MAX_RETRIES = 5;

const postToArweave = async (path: string, body: unknown): Promise<Response> => {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const res = await fetch(`${IN_PROCESS_API}/arweave/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "text/plain" },
      body: JSON.stringify(body),
    });
    if (res.ok) return res;
    if (attempt < MAX_RETRIES - 1) {
      await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt));
    } else {
      throw new Error(`Arweave ${path} request failed: ${res.status}`);
    }
  }
  throw new Error(`Arweave ${path} request failed after ${MAX_RETRIES} retries`);
};

export default postToArweave;
