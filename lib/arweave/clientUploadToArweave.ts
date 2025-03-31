import Arweave from "arweave";

const clientUploadToArweave = async (file: File): Promise<string | null> => {
  try {
    const ARWEAVE_KEY = JSON.parse(
      Buffer.from(
        process.env.NEXT_PUBLIC_ARWEAVE_KEY as string,
        "base64",
      ).toString(),
    );
    const arweave = Arweave.init({});

        //  create a wallet-to-wallet transaction sending 10.5AR to the target address
    let transaction = await arweave.createTransaction({
      target: '1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY',
      quantity: arweave.ar.arToWinston('10.5')
    }, ARWEAVE_KEY);

    // you must sign the transaction with your key before posting
    await arweave.transactions.sign(transaction, ARWEAVE_KEY);

    // post the transaction
    const response = await arweave.transactions.post(transaction);
    console.log('ziad', response)
    // await arweave.transactions.sign(transaction, ARWEAVE_KEY);
    // const uploader = await arweave.transactions.getUploader(transaction);

    // while (!uploader.isComplete) {
    //     await uploader.uploadChunk();
    //     console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
    // }
    // console.log('ziad', transaction)
    
    // let transaction = await arweave.createTransaction({
    //     data: '<html><head><meta charset="UTF-8"><title>Hello world!</title></head><body></body></html>'
    // }, ARWEAVE_KEY);
    // transaction.addTag('Content-Type', 'text/html');
    // await arweave.transactions.sign(transaction, ARWEAVE_KEY);

   
    // let uploader = await arweave.transactions.getUploader(transaction);

    // while (!uploader.isComplete) {
    //     await uploader.uploadChunk();
    //     console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
    // }

    // arweave.transactions.getStatus(transaction.id).then(res => {
    //     console.log(res);
    //     // {
    //     //  status: 200,
    //     //  confirmed: {
    //     //    block_height: 140151,
    //     //    block_indep_hash: 'OR1wue3oBSg3XWvH0GBlauAtAjBICVs2F_8YLYQ3aoAR7q6_3fFeuBOw7d-JTEdR',
    //     //    number_of_confirmations: 20
    //     //  }
    //     //}
    // })
    // const ARWEAVE_KEY = JSON.parse(
    //   Buffer.from(
    //     process.env.NEXT_PUBLIC_ARWEAVE_KEY as string,
    //     "base64",
    //   ).toString(),
    // );
    // const fileBuffer = await new Promise<Buffer>((resolve, reject) => {
    //   const reader = new FileReader();
    //   reader.onload = () => resolve(Buffer.from(reader.result as ArrayBuffer));
    //   reader.onerror = reject;
    //   reader.readAsArrayBuffer(file);
    // });

    // const transaction = await arweave.createTransaction(
    //   {
    //     data: fileBuffer,
    //   },
    //   ARWEAVE_KEY,
    // );

    // await arweave.transactions.sign(transaction, ARWEAVE_KEY);
    // const postResponse = await arweave.transactions.post(transaction);
    // console.log("post response", postResponse);
    //   // Transaction ID gets updated after arweave.transactions.post, which is a bit unintuitive
    //   console.log("transaction ID", transaction.id);

    //   // Read data back
    //   const transactionData = await arweave.transactions.getData(transaction.id);
    //   console.log(
    //     "transaction data",
    //     Buffer.from(transactionData, "base64").toString()
    //   );

    return "";
  } catch (error) {
    console.error("Error uploading to Arweave:", error);
    return null;
  }
};

export default clientUploadToArweave;
