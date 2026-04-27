import { isModelGltfMime } from "@/lib/media/isModelGltfMime";

/** MIME and/or `.glb` / `.gltf` extension (some browsers report an empty type). */
export const isModelGltfLike = (mimeType: string, fileName?: string | null): boolean =>
  isModelGltfMime(mimeType) || Boolean(fileName && /\.(glb|gltf)$/i.test(fileName));
