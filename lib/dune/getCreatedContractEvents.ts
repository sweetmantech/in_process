import { SETUP_NEW_CONTRACT_EVENT_SIGNATURE } from "@/lib/events";
import { CHAIN_ID } from "../consts";
import { DuneDecodedEvent } from "@/types/dune";
import { Address } from "viem";

const getCreatedContractEvents = async (
  addressToGetEvents: Address,
  offset: string | undefined,
  additionalParam: object = {},
): Promise<{
  transactions: DuneDecodedEvent[];
  nextOffset: string | null;
}> => {
  const options = {
    method: "GET",
    headers: { "X-Dune-Api-Key": process.env.DUNE_API_KEY as string },
  };
  const params: any = {
    decode: "true",
    chain_ids: `${CHAIN_ID}`,
    topic0: SETUP_NEW_CONTRACT_EVENT_SIGNATURE,
    ...additionalParam,
  };

  if (offset) params.offset = offset;

  const urlSearchParams = new URLSearchParams(params);

  const response = await fetch(
    `https://api.dune.com/api/echo/v1/transactions/evm/${addressToGetEvents}?${urlSearchParams}`,
    options,
  );
  if (!response.ok) throw Error("failed to get created contract events.");

  const data = await response.json();
  const transactions: DuneDecodedEvent[] = data.transactions;
  const nextOffset: string | null = data?.next_offset;
  return {
    transactions,
    nextOffset,
  };
};

export default getCreatedContractEvents;
