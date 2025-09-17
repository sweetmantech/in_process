"use client";
import { Fragment } from "react";

interface MediaButtonProps {
    onSave: () => void;
    disabled: boolean;
    isSaving: boolean;
    isOwner: boolean;
}


const MediaButton = ({ onSave, disabled, isOwner, isSaving }: MediaButtonProps) => {
    return (
        <Fragment>
            <button
                className="bg-black text-grey-eggshell w-fit px-8 py-2 rounded-md disabled:opacity-50"
                onClick={onSave}
                disabled={disabled}
            >
                {isSaving ? "saving..." : "Save"}
            </button>
            {
                !isOwner && (
                    <p className="text-xs text-grey-moss-500">
                        Only the contract owner can save changes.
                    </p>
                )
            }
        </Fragment>
    )
}

export default MediaButton;