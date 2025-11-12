"use client";
import { useTokenProvider } from "@/providers/TokenProvider";
import useUpdateTokenURI from "@/hooks/useUpdateTokenURI";
import useTokenManageForm from "@/hooks/useTokenManageForm";

const SaveMediaButton = () => {
  const { isOwner } = useTokenProvider();
  const { updateTokenURI, isLoading: isSaving } = useUpdateTokenURI();
  const { form } = useTokenManageForm();

  const saveHandler = () => {
    const formValues = form.getValues();
    updateTokenURI({
      name: formValues.name,
      description: formValues.description,
    });
  };

  return (
    <button
      className="bg-black text-grey-eggshell w-fit px-8 py-2 rounded-md disabled:opacity-50"
      onClick={saveHandler}
      disabled={isSaving || !isOwner}
    >
      {isSaving ? "saving..." : "Save"}
    </button>
  );
};

export default SaveMediaButton;
