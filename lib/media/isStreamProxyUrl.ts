import { IN_PROCESS_API } from "@/lib/consts";

/** InProcess `/api/media/stream?…`; identifiable without fetching (avoid misleading HEAD probes). */
const isStreamProxyUrl = (url: string): boolean => url.startsWith(`${IN_PROCESS_API}/media/stream`);

export default isStreamProxyUrl;
