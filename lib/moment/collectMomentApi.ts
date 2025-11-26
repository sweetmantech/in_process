import { Moment } from "@/types/legacy/moment";

export const collectMomentApi = async (
  moment: Moment,
  amount: number,
  comment: string,
  accessToken: string
): Promise<string> => {
  try {
    const response = await fetch("/api/moment/collect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        moment: {
          contractAddress: moment.contractAddress,
          tokenId: moment.tokenId,
        },
        amount,
        comment,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.hash;
  } catch (error) {
    console.error(error);
    throw new Error((error as any).message || "Failed to collect moment");
  }
};
