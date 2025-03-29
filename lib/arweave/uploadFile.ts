import axios from "axios";

export const uploadFile = async (file: File): Promise<string> => {
  try {
    const fileStreamFactory = (file: File): ReadableStream => {
      return new ReadableStream({
        async start(controller) {
          try {
            const buffer = await file.arrayBuffer();
            const uint8Array = new Uint8Array(buffer);
            controller.enqueue(uint8Array);
            controller.close();
          } catch (error) {
            console.error("Error reading file:", error);
          }
        },
      });
    };

    const fileStream = fileStreamFactory(file);

    const res = await axios.post("/api/arweave", fileStream, {
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });
    const arweaveURI = res.data;

    return arweaveURI;
  } catch (error) {
    console.error(error);
    return "";
  }
};
