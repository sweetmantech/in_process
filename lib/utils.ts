import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getIpfsLink(uri?: string) {
  if (!uri) return "";
  if (uri.includes("ipfs.io"))
    return uri.replaceAll("ipfs.io", "ipfs.decentralized-content.com");
  if (uri.startsWith("ipfs://"))
    return uri.replaceAll(
      "ipfs://",
      "https://ipfs.decentralized-content.com/ipfs/",
    );
  return uri;
}