import { IN_PROCESS_API } from "@/lib/consts";

const getStreamingUrl = (url: string) => {
  if (url.startsWith("blob:")) return url;
  return `${IN_PROCESS_API}/media/stream?url=${encodeURIComponent(url)}`;
};

export default getStreamingUrl;
