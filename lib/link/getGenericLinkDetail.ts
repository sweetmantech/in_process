import { getLinkPreview } from "link-preview-js";
import dns from "node:dns";
import { LinkPreview } from "@/types/link";

/**
 * Gets generic link preview for URLs that don't match platform-specific handlers
 */
async function getGenericLinkDetail(url: string): Promise<LinkPreview> {
  const data = await getLinkPreview(url, {
    followRedirects: `manual`,
    handleRedirects: (baseURL: string, forwardedURL: string) => {
      const urlObj = new URL(baseURL);
      const forwardedURLObj = new URL(forwardedURL);
      if (
        forwardedURLObj.hostname === urlObj.hostname ||
        forwardedURLObj.hostname === "www." + urlObj.hostname ||
        "www." + forwardedURLObj.hostname === urlObj.hostname
      ) {
        return true;
      } else {
        return false;
      }
    },
    resolveDNSHost: async (url: string) => {
      return new Promise((resolve, reject) => {
        const hostname = new URL(url).hostname;
        dns.lookup(hostname, (err, address) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(address);
        });
      });
    },
  });

  return data as LinkPreview;
}

export default getGenericLinkDetail;
