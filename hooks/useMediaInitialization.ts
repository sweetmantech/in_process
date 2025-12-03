import { useEffect, useRef } from "react";
import { MomentMetadata } from "@/types/moment";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

const useMediaInitialization = (meta: MomentMetadata | undefined) => {
  const {
    name,
    description,
    mimeType,
    animationFile,
    imageFile,
    previewFile,
    setName,
    setDescription,
    setMimeType,
    form,
  } = useMomentFormProvider();

  const initializedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!meta) return;

    // Create a simple key from metadata to track if we've initialized
    const metaKey = meta.animation_url || meta.image || meta.name || "";
    if (initializedRef.current === metaKey) return;

    // Don't initialize if user has selected files (they're actively editing)
    const hasSelectedFiles = Boolean(animationFile || imageFile || previewFile);
    if (hasSelectedFiles) return;

    // Check both state and form values to prevent overwriting user edits
    // In update flow, name and description should only be changed manually by user
    const formName = form.getValues("name");
    const formDescription = form.getValues("description");
    const hasName = (name && name !== "") || (formName && formName !== "");
    const hasDescription =
      (description && description !== "") || (formDescription && formDescription !== "");

    // Only initialize if fields are empty (don't overwrite user edits)
    if (!hasName && meta.name) {
      setName(meta.name);
    }

    if (!hasDescription && meta.description) {
      setDescription(meta.description);
    }

    // Only set mime type from metadata if not already set (don't overwrite user file selection)
    if ((!mimeType || mimeType === "") && meta.content?.mime) {
      setMimeType(meta.content.mime);
    }

    initializedRef.current = metaKey;
    // Only depend on meta - state values are checked in conditions but don't need to trigger re-runs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta]);
};

export default useMediaInitialization;
