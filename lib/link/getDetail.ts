import { LinkPreview } from "@/types/link";
import getYoutubeDetail from "./getYoutubeDetail";
import getTiktokDetail from "./getTiktokDetail";
import getGenericLinkDetail from "./getGenericLinkDetail";

/**
 * Gets URL detail by trying platform-specific handlers first,
 * then falling back to generic link preview
 */
async function getDetail(url: string): Promise<LinkPreview> {
  // Try YouTube first
  const youtubeDetail = await getYoutubeDetail(url);
  if (youtubeDetail) return youtubeDetail;

  // Try TikTok second
  const tiktokDetail = await getTiktokDetail(url);
  if (tiktokDetail) return tiktokDetail;

  // Fallback to generic link preview
  return await getGenericLinkDetail(url);
}

export default getDetail;
