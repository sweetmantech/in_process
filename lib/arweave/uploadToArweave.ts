import Arweave from "arweave";

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 20000,
  logging: false,
});

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
  const uploader = await arweave.transactions.getUploader(transaction);

  while (!uploader.isComplete) {
    console.log(
      `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
    );
    getProgress(uploader.pctComplete);
    await uploader.uploadChunk();
  }

  // Ensure progress callback is called with 100% when upload completes
  getProgress(100);

  return `ar://${transaction.id}`;
};

export default uploadToArweave;
