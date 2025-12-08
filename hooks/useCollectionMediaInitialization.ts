import { useEffect } from "react";
import { TokenMetadataJson } from "@/lib/protocolSdk/ipfs/types";
import { useCollectionFormProvider } from "@/providers/CollectionFormProvider";

const useCollectionMediaInitialization = (meta: TokenMetadataJson | undefined) => {
  const { name, description, setName, setDescription, form } = useCollectionFormProvider();

  useEffect(() => {
    if (!meta) return;

    // Check both state and form values to prevent overwriting user edits
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
      setDescription(meta.description || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta]);
};

export default useCollectionMediaInitialization;
