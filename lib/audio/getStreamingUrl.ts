import { IN_PROCESS_API } from "@/lib/consts";

const getStreamingUrl = (audioUrl: string) => {
  return `${IN_PROCESS_API}/media/stream?url=${encodeURIComponent(audioUrl)}`;
};

export default getStreamingUrl;
