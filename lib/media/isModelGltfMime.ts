/** Matches GLB / GLTF NFT media (standard MIME + extension-style strings). */
export const isModelGltfMime = (mimeType: string): boolean =>
  mimeType.includes("glb") || mimeType.includes("model/gltf");
