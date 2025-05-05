import { DuneDecodedEvent } from "@/types/dune";

const getFormattedTransfers = (transactions: DuneDecodedEvent[]) => {
  const transfers = transactions.map((transaction: DuneDecodedEvent) => {
    const transferEvent = transaction.logs.findLast(
      (log) => log?.decoded?.name === "Transfer",
    );
    if (!transferEvent) return;
    const data: any = {
      chainId: transaction.chain_id,
      chain: transaction.chain,
    };
    transferEvent?.decoded?.inputs.forEach((input) => {
      data[`${input.name}`] = input.value;
    });
    data.timestamp = new Date(transaction.block_time).getTime();
    data.blockNumber = transaction.block_number;
    data.transactionHash = transaction.hash;
    return data;
  });

  return transfers;
};

export default getFormattedTransfers;
