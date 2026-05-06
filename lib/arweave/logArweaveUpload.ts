import { IN_PROCESS_API } from "@/lib/consts";
import type { UploadFileResult } from "./uploadFile";

const logArweaveUpload = (result: UploadFileResult, authHeaders: HeadersInit): void => {
  fetch(`${IN_PROCESS_API}/arweave/logs`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify([
      {
        arweave_uri: result.arweave_uri,
        winc_cost: result.winc_cost,
        file_size_bytes: result.file_size_bytes,
        content_type: result.content_type,
      },
    ]),
  }).catch((e: unknown) => console.error("❌ logArweaveUpload:", e));
};

export default logArweaveUpload;
