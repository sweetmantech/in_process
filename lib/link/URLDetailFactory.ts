import { getLinkPreview } from "link-preview-js";
import dns from "node:dns";
import { LinkPreview } from "@/types/link";
import getYoutubeDetail from "./getYoutubeDetail";
import getTiktokDetail from "./getTiktokDetail";

export class URLDetailFactory {
  /**
   * Gets URL detail by trying platform-specific handlers first,
   * then falling back to generic link preview
   */
  static async getDetail(url: string): Promise<LinkPreview> {
    // Try YouTube first
    const youtubeDetail = await getYoutubeDetail(url);
    if (youtubeDetail) return youtubeDetail;

    // Try TikTok second
    const tiktokDetail = await getTiktokDetail(url);
    if (tiktokDetail) return tiktokDetail;

    // Fallback to generic link preview
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
}
