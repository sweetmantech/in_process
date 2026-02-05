import { IN_PROCESS_API } from "../consts";

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
