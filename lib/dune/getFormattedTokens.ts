import { DuneDecodedEvent } from "@/types/dune";
import { BLOCKLISTS, IS_TESTNET } from "../consts";

const getFormattedTokens = (events: DuneDecodedEvent[]) => {
  return events
    .sort(
      (a: DuneDecodedEvent, b: DuneDecodedEvent) =>
        new Date(b.block_time).getTime() - new Date(a.block_time).getTime(),
    )
    .map((transaction: DuneDecodedEvent) => {
      const setUpEvent = transaction.logs.find(
        (log) => log?.decoded?.name === "SetupNewToken",
      );
      if (!setUpEvent) return;
      const data: any = {
        chainId: transaction.chain_id,
        chain: transaction.chain,
      };
      setUpEvent?.decoded?.inputs.forEach((input) => {
        data[`${input.name}`] = input.value;
      });
      data.released_at = new Date(transaction.block_time).getTime();
      return data;
    })
    .filter((t) => IS_TESTNET || !BLOCKLISTS.includes(t.sender));
};

export default getFormattedTokens;
