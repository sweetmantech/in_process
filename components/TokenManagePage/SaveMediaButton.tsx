"use client";
import { useTokenProvider } from "@/providers/TokenProvider";
import useUpdateTokenURI from "@/hooks/useUpdateTokenURI";
import {useZoraManageProvider} from "@/providers/ZoraManageProvider";

const SaveMediaButton = () => {
    const { isOwner } = useTokenProvider();
    const {
        name,
        description,
        imageUri,
    } = useZoraManageProvider();

    const { updateTokenURI, isLoading: isSaving } = useUpdateTokenURI();

    const saveHandler = () => {
        updateTokenURI(name, description, imageUri);
    }

    return (
        <button
            className="bg-black text-grey-eggshell w-fit px-8 py-2 rounded-md disabled:opacity-50"
            onClick={saveHandler}
            disabled={isSaving || !isOwner}
        >
            {isSaving ? "saving..." : "Save"}
        </button>
    )
}

export default SaveMediaButton;