import { Moment } from "@/types/moment";
import { IN_PROCESS_API } from "@/lib/consts";
import { Address } from "viem";

interface CallUpdateMomentURIInput {
  moment: Moment;
  newUri: string;
  newCollectionAddress?: Address;
  authHeaders: HeadersInit;
}

export async function callUpdateMomentURI({
  moment,
  newUri,
  newCollectionAddress,
  authHeaders,
}: CallUpdateMomentURIInput): Promise<void> {
  try {
    const response = await fetch(`${IN_PROCESS_API}/moment`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        ...authHeaders,
      },
      body: JSON.stringify({
        moment,
        newUri,
        newCollectionAddress,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update moment metadata");
    }
    return data.hash;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to update moment metadata");
  }
}
