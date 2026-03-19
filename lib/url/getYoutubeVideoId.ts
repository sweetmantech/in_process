export const getYoutubeVideoId = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1) || null;
    }
    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
};
