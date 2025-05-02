import { DuneDecodedEvent } from "@/types/dune";

const getFormattedMintComments = (events: DuneDecodedEvent[]) => {
  return events.map((transaction: DuneDecodedEvent) => {
    const mintCommentEvent = transaction.logs.find(
      (log) => log?.decoded?.name === "MintComment",
    );
    if (!mintCommentEvent) return;
    const data: any = {
      chainId: transaction.chain_id,
      chain: transaction.chain,
    };
    mintCommentEvent?.decoded?.inputs.forEach((input) => {
      data[`${input.name}`] = input.value;
    });
    data.timestamp = new Date(transaction.block_time).getTime();
    data.blockNumber = transaction.block_number;
    data.transactionHash = transaction.hash;
    return data;
  });
};

export default getFormattedMintComments;
