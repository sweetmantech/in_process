import { uploadFile } from "./uploadFile";
import patchFetch from "./patchFetch";

const uploadToArweave = async (
  file: File,
  getProgress: (progress: number) => void = () => {}
): Promise<string> => {
  const restoreFetch = patchFetch();
  try {
    return await uploadFile(file, getProgress);
  } finally {
    restoreFetch();
  }
};

export default uploadToArweave;
