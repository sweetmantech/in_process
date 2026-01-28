import { IN_PROCESS_API } from "@/lib/consts";

export const uploadFile = async (file: File): Promise<string> => {
  try {
    const data = new FormData();
    data.set("file", file);
    const res = await fetch(`${IN_PROCESS_API}/arweave`, { method: "POST", body: data });
    const arweaveURI = await res.json();

    return arweaveURI;
  } catch (error) {
    console.error(error);
    return "";
  }
};
