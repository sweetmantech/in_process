import { uploadFile } from "./uploadFile";
import patchFetch from "./patchFetch";

const uploadToArweave = async (
  file: File,
  getProgress: (progress: number) => void = () => {}
): Promise<string> => {
  const restoreFetch = patchFetch();
  try {
    const { arweave_uri } = await uploadFile(file, getProgress);
    return arweave_uri;
  } finally {
    restoreFetch();
  }
};

export default uploadToArweave;
