import { IN_PROCESS_API } from "../consts";

const getBlurUrl = (src: string | null | undefined): string | null => {
  if (!src) return null;

  // Local/static images - return as-is (no blur optimization available)
  if (src.startsWith("/") || src.startsWith("data:") || src.startsWith("blob:")) {
    return null;
  }

  // External images - get tiny low-quality version
  const params = new URLSearchParams({
    url: src,
    w: "16",
    q: "10",
    f: "webp",
  });

  return `${IN_PROCESS_API}/media/image?${params.toString()}`;
};

export default getBlurUrl;
