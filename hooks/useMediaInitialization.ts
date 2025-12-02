import { useEffect, useRef } from "react";
import { MomentMetadata } from "@/types/moment";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

const useMediaInitialization = (meta: MomentMetadata | undefined) => {
  const { name, description, setName, setDescription, setMimeType } = useMomentFormProvider();

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

    // Set mime type from metadata if available
    if (meta.content?.mime) {
      setMimeType(meta.content.mime);
    }

    initializedRef.current = metaKey;
    // Only depend on meta - state values are checked in conditions but don't need to trigger re-runs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta]);
};

export default useMediaInitialization;
