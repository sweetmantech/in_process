const postToArweave = async (path: string, body: unknown): Promise<Response> => {
  const res = await fetch(`/api/arweave/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "text/plain" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Arweave ${path} request failed: ${res.status}`);
  }
  return res;
};

export default postToArweave;
