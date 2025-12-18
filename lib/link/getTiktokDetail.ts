import { LinkPreview } from "@/types/link";

const getTiktokDetail = async (url: string): Promise<LinkPreview | null> => {
  // Check if it's a TikTok URL
  if (!url.includes("tiktok.com")) {
    return null;
  }

  try {
    // TikTok oEmbed API endpoint
    const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
    const response = await fetch(oembedUrl);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data) {
      return {
        siteName: "tiktok",
        favicons: [],
        images: data.thumbnail_url ? [data.thumbnail_url] : [],
        title: data.title || data.author_name || "TikTok Video",
        description: data.title || data.author_name || "",
        url: data.embed_url || url,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching TikTok detail:", error);
    return null;
  }
};

export default getTiktokDetail;
