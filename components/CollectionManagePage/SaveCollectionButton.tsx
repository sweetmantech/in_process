"use client";

import useCollectionLegacyWarning from "@/hooks/useCollectionLegacyWarning";
import useSaveCollectionButton from "@/hooks/useSaveCollectionButton";
import { SaveCollectionButtonProps } from "@/types/ui";
import Warning from "./Warning";
import GrantCollectionPermissionButton from "./GrantCollectionPermissionButton";

const SaveCollectionButton = (props: SaveCollectionButtonProps) => {
  const { isSaving, isDisabled, onSave } = useSaveCollectionButton(props);
  const hasWarning = useCollectionLegacyWarning();

  return (
    <div>
      <Warning />
      {hasWarning ? (
        <GrantCollectionPermissionButton />
      ) : (
        <button
          className="w-fit rounded-md bg-black px-8 py-2 text-grey-eggshell transition-colors hover:bg-grey-moss-300 disabled:opacity-50"
          onClick={onSave}
          disabled={isSaving || isDisabled || hasWarning}
        >
          {isSaving ? "saving..." : "Save"}
        </button>
      )}
    </div>
  );
};

export default SaveCollectionButton;
