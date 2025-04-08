import { Readable } from "node:stream";
import turboClient from "./client";

const uploadToArweave = async (file: File): Promise<string | null> => {
  try {
    const fileSize = file.size;
    const buffer = await file.arrayBuffer();

    const fileStreamFactory = () => {
      const stream = new Readable({
        read() {
          const bufferToPush = Buffer.from(buffer);
          this.push(bufferToPush);
          this.push(null);
        },
      });
      return stream;
    };

    const { id } = await turboClient.uploadFile({
      fileStreamFactory,
      fileSizeFactory: () => fileSize,
      dataItemOpts: {
        tags: [
          {
            name: "Content-Type",
            value: file.type,
          },
          {
            name: "File-Name",
            value: file.name,
          },
        ],
      },
    });

    if (!id) return null;
    return `ar://${id}`;
  } catch (error) {
    console.error("Error uploading to Arweave:", error);
    return null;
  }
};

export default uploadToArweave;
