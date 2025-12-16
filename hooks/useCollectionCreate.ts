import { toast } from "sonner";

export const useCollectionCreate = () => {
  const handleSubmit = async () => {
    toast.info("We are cooking this feature right now. Please check back later.");
  };

  return {
    handleSubmit,
  };
};
