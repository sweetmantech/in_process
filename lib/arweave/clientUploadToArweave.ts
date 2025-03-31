
const clientUploadToArweave = async (file: File): Promise<string | null> => {
  try {
    // const ARWEAVE_KEY = JSON.parse(
    //   Buffer.from(
    //     process.env.NEXT_PUBLIC_ARWEAVE_KEY as string,
    //     "base64",
    //   ).toString(),
    // );
    // const signer = new ArweaveSigner(ARWEAVE_KEY)

    // // Create a DataItem from a string
    // const myStringData: string = 'Hello, Permaweb!'
    // const myDataItem = createData(myStringData, signer)
    
    // // Create a DataItem from a Buffer or Uint8Array
    // const myBufferData: Buffer | Uint8Array = Buffer.from('Hello, Permaweb!')
    // const myOtherDataItem = createData(myBufferData, signer)


    return "";
  } catch (error) {
    console.error("Error uploading to Arweave:", error);
    return null;
  }
};

export default clientUploadToArweave;
