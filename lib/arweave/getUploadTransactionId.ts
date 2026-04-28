/** Turbo may return a top-level id or (in some flows) a finalized receipt with id. */
export const getUploadTransactionId = (result: unknown): string | undefined => {
  if (!result || typeof result !== "object") return undefined;
  const o = result as Record<string, unknown>;
  if (typeof o.id === "string" && o.id.length > 0) return o.id;
  const receipt = o.receipt;
  if (receipt && typeof receipt === "object" && "id" in receipt) {
    const id = (receipt as { id?: unknown }).id;
    return typeof id === "string" && id.length > 0 ? id : undefined;
  }
  return undefined;
};
