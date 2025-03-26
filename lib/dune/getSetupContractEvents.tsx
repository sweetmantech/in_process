import { CHAIN_ID } from "@/lib/consts";
import { SETUP_NEW_CONTRACT_EVENT_SIGNATURE } from "../events";
import { FACTORY_ADDRESSES } from "@/lib/protocolSdk/create/factory-addresses";
import { DuneDecodedEvent } from "@/types/dune";

const getSetupContractEvents = async (
  artistAddress: string,
): Promise<DuneDecodedEvent[]> => {
  const options = {
    method: "GET",
    headers: { "X-Dune-Api-Key": process.env.DUNE_API_KEY as string },
  };
  const params: any = {
    decode: "true",
    chain_ids: `${CHAIN_ID}`,
    topic0: SETUP_NEW_CONTRACT_EVENT_SIGNATURE,
  };

  // Filter transactions to a given address
  if (artistAddress) params["to"] = FACTORY_ADDRESSES[CHAIN_ID];

  const urlSearchParams = new URLSearchParams(params);

  // Wallet to get transactions for
  const walletToGet = artistAddress || FACTORY_ADDRESSES[CHAIN_ID];

  const response = await fetch(
    `https://api.dune.com/api/echo/v1/transactions/evm/${walletToGet}?${urlSearchParams}`,
    options,
  );
  if (!response.ok) throw Error("failed to call Dune API.");

  const data = await response.json();
  const transactions: DuneDecodedEvent[] = data.transactions;
  return transactions;
};

export default getSetupContractEvents;
