import saveFile from "./saveFile";

export type IPFSUploadResponse = {
  cid: string;
  uri: string;
};

export const uploadFile = async (
  file: File,
  jwt?: string,
): Promise<IPFSUploadResponse> => {
  try {
    console.log("uploadingFile...");
    const data = new FormData();
    console.log("data", data);

    data.set("file", file);
    console.log("file", file);

    let cid: any;
    console.log("jwt", jwt);
    console.log("data", data);
    if (jwt) {
      cid = await saveFile(data, jwt);
    } else {
      const res = await fetch("/api/ipfs", { method: "POST", body: data });
      const json = await res.json();
      cid = json.cid;
    }

    return { cid, uri: `ipfs://${cid}` };
  } catch (error) {
    console.error(error);
    return { cid: "", uri: "" };
  }
};
