import { CHAIN_ID, MULTICALL3_ADDRESS } from "../consts";
import { DuneDecodedEvent } from "@/types/dune";
import { ERC20_MINT_COMMENT_EVENT_SIGNATURE } from "../events";

const getSwapMintComments = async (
  tokenContract: string,
): Promise<DuneDecodedEvent[]> => {
  const options = {
    method: "GET",
    headers: { "X-Dune-Api-Key": process.env.DUNE_API_KEY as string },
  };
  const params: any = {
    decode: "true",
    chain_ids: `${CHAIN_ID}`,
    topic0: ERC20_MINT_COMMENT_EVENT_SIGNATURE,
    log_address: tokenContract,
  };

  const maximumDeep = 100;
  let loop = 0;
  let transactions: DuneDecodedEvent[] = [];
  while (1) {
    try {
      if (loop > maximumDeep) break;
      const urlSearchParams = new URLSearchParams(params);
      const response = await fetch(
        `https://api.dune.com/api/echo/v1/transactions/evm/${MULTICALL3_ADDRESS}?${urlSearchParams}`,
        options,
      );
      if (!response.ok) throw Error("failed to call Dune API.");

      const data = await response.json();
      if (data.transactions.length)
        transactions = transactions.concat(data.transactions);
      const nextOffset = data.next_offset;
      params.offset = nextOffset;
      loop++;
    } catch (error) {
      console.error(error);
    }
  }
  return transactions.flat();
};

export default getSwapMintComments;
