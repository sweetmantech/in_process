/** Client-side check before mounting WebGL viewers (model-viewer / THREE). */
export const isWebGLAvailable = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false }) ??
      canvas.getContext("experimental-webgl") ??
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false });
    return !!gl;
  } catch {
    return false;
  }
};
