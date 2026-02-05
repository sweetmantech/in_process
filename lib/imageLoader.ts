import { IN_PROCESS_API } from "./consts";

type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

const imageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  // Local/static images - return as-is
  if (src.startsWith("/") || src.startsWith("data:")) {
    return src;
  }

  // Blob URLs - return as-is (used during file upload previews)
  if (src.startsWith("blob:")) {
    return src;
  }

  // External images - route through the optimization proxy
  const params = new URLSearchParams({
    url: src,
    w: width.toString(),
    q: (quality || 75).toString(),
    f: "webp",
  });

  return `${IN_PROCESS_API}/media/image?${params.toString()}`;
};

export default imageLoader;

// Generate a low-quality blur URL for the same image
export const getBlurUrl = (src: string | null | undefined): string | null => {
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
