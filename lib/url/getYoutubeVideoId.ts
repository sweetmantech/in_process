const YOUTUBE_HOSTNAMES = new Set(["youtube.com", "www.youtube.com", "m.youtube.com"]);

export const getYoutubeVideoId = (url: string): string | null => {
  try {
    const parsed = new URL(url);

    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1) || null;
    }

    if (YOUTUBE_HOSTNAMES.has(parsed.hostname)) {
      const parts = parsed.pathname.split("/");
      const embedIdx = parts.indexOf("embed");
      if (embedIdx !== -1) return parts[embedIdx + 1] || null;

      const shortsIdx = parts.indexOf("shorts");
      if (shortsIdx !== -1) return parts[shortsIdx + 1] || null;

      return parsed.searchParams.get("v");
    }

    return null;
  } catch {
    return null;
  }
};
