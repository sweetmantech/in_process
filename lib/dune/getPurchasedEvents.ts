import { CHAIN_ID } from "../consts";
import { DuneDecodedEvent } from "@/types/dune";
import { PURCHASED_EVENT_SIGNATURE } from "../events";

const getPurchasedEvents = async (
  tokenContract: string,
): Promise<DuneDecodedEvent[]> => {
  try {
    const options = {
      method: "GET",
      headers: { "X-Dune-Api-Key": process.env.DUNE_API_KEY as string },
    };
    const params: any = {
      decode: "true",
      chain_ids: `${CHAIN_ID}`,
      topic0: PURCHASED_EVENT_SIGNATURE,
    };

    const urlSearchParams = new URLSearchParams(params);

    const response = await fetch(
      `https://api.dune.com/api/echo/v1/transactions/evm/${tokenContract}?${urlSearchParams}`,
      options,
    );
    if (!response.ok) throw Error("failed to call Dune API.");

    const data = await response.json();
    const transactions: DuneDecodedEvent[] = data.transactions;
    return transactions;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getPurchasedEvents;
