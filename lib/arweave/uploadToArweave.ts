import arweave from "./client";
import postToArweave from "./postToArweave";
import waitForArweave from "./waitForArweave";

const uploadToArweave = async (
  file: File,
  getProgress: (progress: number) => void = () => {}
): Promise<string> => {
  const ARWEAVE_KEY = JSON.parse(
    Buffer.from(process.env.NEXT_PUBLIC_ARWEAVE_KEY as string, "base64").toString()
  );
  const buffer = await file.arrayBuffer();

  const transaction = await arweave.createTransaction(
    {
      data: buffer,
    },
    ARWEAVE_KEY
  );
  transaction.addTag("Content-Type", file.type);
  await arweave.transactions.sign(transaction, ARWEAVE_KEY);

  const data = transaction.data;
  const totalChunks = transaction.chunks!.chunks.length;

  // Post transaction header via proxy (with data emptied for chunked upload)
  transaction.data = new Uint8Array(0);
  await postToArweave("tx", transaction);

  // Upload each chunk via proxy
  for (let i = 0; i < totalChunks; i++) {
    const chunk = transaction.getChunk(i, data);
    await postToArweave("chunk", chunk);
    const pctComplete = Math.round(((i + 1) / totalChunks) * 100);
    console.log(`${pctComplete}% complete, ${i + 1}/${totalChunks}`);
    getProgress(pctComplete);
  }

  await waitForArweave(transaction.id);

  return `ar://${transaction.id}`;
};

export default uploadToArweave;
