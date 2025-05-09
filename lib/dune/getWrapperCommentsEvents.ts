import { CHAIN_ID, ETH_USDC_WRAPPER } from "../consts";
import { DuneDecodedEvent } from "@/types/dune";
import { MINT_COMMENT_EVENT_SIGNATURE } from "../events";

const getWrapperCommentsEvents = async (
  tokenContract: string,
  chainId: string,
): Promise<DuneDecodedEvent[]> => {
  const options = {
    method: "GET",
    headers: { "X-Dune-Api-Key": process.env.DUNE_API_KEY as string },
  };
  const params: any = {
    decode: "true",
    chain_ids: `${chainId || CHAIN_ID}`,
    topic0: MINT_COMMENT_EVENT_SIGNATURE,
    log_address: tokenContract,
  };

  const urlSearchParams = new URLSearchParams(params);

  const response = await fetch(
    `https://api.dune.com/api/echo/v1/transactions/evm/${ETH_USDC_WRAPPER}?${urlSearchParams}`,
    options,
  );
  if (!response.ok) throw Error("failed to call Dune API.");

  const data = await response.json();
  const transactions: DuneDecodedEvent[] = data.transactions;
  return transactions;
};

export default getWrapperCommentsEvents;
