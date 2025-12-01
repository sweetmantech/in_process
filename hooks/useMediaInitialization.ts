import { useEffect, useRef } from "react";
import { MomentMetadata } from "@/types/moment";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

const useMediaInitialization = (meta: MomentMetadata | undefined) => {
  const {
    name,
    description,
    imageUri,
    animationUri,
    setName,
    setDescription,
    setImageUri,
    setAnimationUri,
    setMimeType,
  } = useMomentFormProvider();

  const initializedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!meta) return;

    // Create a simple key from metadata to track if we've initialized
    const metaKey = meta.animation_url || meta.image || meta.name || "";
    if (initializedRef.current === metaKey) return;

    // Only initialize if fields are empty (don't overwrite user edits)
    if ((!name || name === "") && meta.name) {
      setName(meta.name);
    }

    if ((!description || description === "") && meta.description) {
      setDescription(meta.description);
    }

    if (!imageUri && meta.image) {
      setImageUri(meta.image);
    }

    if (meta.animation_url) {
      if (!animationUri) {
        setAnimationUri(meta.animation_url);
        if (meta.content?.mime) {
          setMimeType(meta.content.mime);
        }
      }
    } else if (!animationUri) {
      setAnimationUri("");
    }

    initializedRef.current = metaKey;
    // Only depend on meta - state values are checked in conditions but don't need to trigger re-runs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta]);
};

export default useMediaInitialization;
