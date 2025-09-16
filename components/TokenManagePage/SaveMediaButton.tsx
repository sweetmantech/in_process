"use client";
import { useTokenProvider } from "@/providers/TokenProvider";
import useUpdateTokenURI from "@/hooks/useUpdateTokenURI";

interface SaveMediaButtonProps {
    title: string;
    description: string;
}

const SaveMediaButton = ({ title, description }: SaveMediaButtonProps) => {
    const { isOwner } = useTokenProvider();

    const { updateTokenURI, isLoading: isSaving } = useUpdateTokenURI();

    const saveHandler = () => {
        updateTokenURI(title, description);
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