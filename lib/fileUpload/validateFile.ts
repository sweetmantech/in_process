import { MAX_FILE_SIZE } from "@/lib/consts";

export const validateFile = (file: File | null): file is File => {
  if (!file) {
    throw new Error("No file selected");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size is too large, Please select a file smaller than 222MB");
  }

  return true;
};
