export const uploadFile = async (file: File): Promise<string> => {
  try {
    const data = new FormData();
    data.set("file", file);
    const res = await fetch("/api/ipfs", { method: "POST", body: data });
    const arweave_url = await res.json();

    return arweave_url;
  } catch (error) {
    console.error(error);
    return "";
  }
};
