"use client";
import useSaveCollectionButton from "@/hooks/useSaveCollectionButton";
import { SaveCollectionButtonProps } from "@/types/ui";

const SaveCollectionButton = (props: SaveCollectionButtonProps) => {
  const { isSaving, isDisabled, onSave, hasNotPermission } = useSaveCollectionButton(props);

  return (
    <div>
      {hasNotPermission && (
        <p className="mb-4 text-sm text-amber-600">
          The In Process smart wallet does not have permission to edit legacy moments. Please sign a
          transaction with your external wallet to grant the smart wallet permission to edit this
          collection.
        </p>
      )}
      <button
        className="w-fit rounded-md bg-black px-8 py-2 text-grey-eggshell transition-colors hover:bg-grey-moss-300 disabled:opacity-50"
        onClick={onSave}
        disabled={isSaving || isDisabled}
      >
        {isSaving ? "saving..." : "Save"}
      </button>
    </div>
  );
};

export default SaveCollectionButton;
