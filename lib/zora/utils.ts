export const determineMediaType = (mimeType: string): string => {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("audio/")) return "audio";
  if (mimeType === "application/pdf") return "pdf";
  if (mimeType.startsWith("text/plain") || mimeType === "application/json") return "text";
  if (mimeType === "text/html") return "html";
  if (mimeType === "model/gltf-binary") return "gltf";
  return "unknown";
};
