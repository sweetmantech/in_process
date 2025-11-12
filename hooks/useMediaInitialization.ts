import { useEffect, useRef } from "react";
import { Metadata } from "@/types/token";
import { useMomentManageProvider } from "@/providers/MomentManageProvider";

const useMediaInitialization = (meta: Metadata | undefined) => {
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
  } = useMomentManageProvider();

  const lastMetaRef = useRef<string | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!meta) return;

    const metaKey = meta.animation_url || meta.image || "";

    if (lastMetaRef.current !== metaKey) {
      initializedRef.current = false;
      lastMetaRef.current = metaKey;
    }

    if (initializedRef.current) return;

    if ((!name || name === "") && meta.name) {
      setName(meta.name);
    }

    if ((!description || description === "") && meta.description) {
      setDescription(meta.description);
    }

    if (!imageUri) {
      setImageUri(meta.image || "");
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

    initializedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta]);
};

export default useMediaInitialization;
