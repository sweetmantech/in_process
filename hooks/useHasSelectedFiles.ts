export const useHasSelectedFiles = (
  previewFile: File | null,
  imageFile: File | null,
  animationFile: File | null
): boolean => {
  return Boolean(previewFile || imageFile || animationFile);
};
