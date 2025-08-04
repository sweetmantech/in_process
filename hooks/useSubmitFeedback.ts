import submitFeedback from "@/lib/submitFeedback";
import { useState } from "react";

const useSubmitFeedback = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const [name, setName] = useState<string>("");

  const submit = async () => {
    if (!name.trim() || !feedback.trim()) {
      return;
    }
    setIsLoading(true);
    submitFeedback(feedback, name);
    setFeedback("");
    setName("");
    setIsOpenModal(false);
    setIsLoading(false);
  };

  return {
    submit,
    isLoading,
    isOpenModal,
    setIsOpenModal,
    setFeedback,
    feedback,
    setName,
    name,
  };
};

export default useSubmitFeedback;
