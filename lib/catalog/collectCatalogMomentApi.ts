import { Moment } from "@/types/moment";
import { IN_PROCESS_API } from "@/lib/consts";

export const collectCatalogMomentApi = async (
  moment: Moment,
  amount: number,
  accessToken: string
): Promise<string> => {
  try {
    const response = await fetch(`${IN_PROCESS_API}/catalog/collect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ moment, amount }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.hash;
  } catch (error) {
    console.error(error);
    throw new Error((error as any).message || "Failed to collect catalog moment");
  }
};
