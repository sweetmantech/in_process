/**
 * Parses Arweave transaction id from known URI shapes (ar://, arweave.net, turbo-gateway, ar-io).
 */
const extractArweaveTxId = (url: string): string | null => {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (trimmed.startsWith("ar://")) {
    const rest = trimmed.slice("ar://".length).split("/")[0];
    return rest || null;
  }
  try {
    const u = new URL(trimmed);
    if (!/^https?:$/i.test(u.protocol)) return null;
    const host = u.hostname.toLowerCase();
    if (host === "arweave.net" || host.endsWith(".arweave.net")) {
      const seg = u.pathname.replace(/^\//, "").split("/")[0];
      return seg || null;
    }
    if (host === "turbo-gateway.com" || host.endsWith(".turbo-gateway.com")) {
      const seg = u.pathname.replace(/^\//, "").split("/")[0];
      return seg || null;
    }
    if (host === "ar-io.net" || host.endsWith(".ar-io.net")) {
      const seg = u.pathname.replace(/^\//, "").split("/")[0];
      return seg || null;
    }
    return null;
  } catch {
    return null;
  }
};

export default extractArweaveTxId;
