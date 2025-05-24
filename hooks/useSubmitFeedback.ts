import submitFeedback from "@/lib/submitFeedback";
import { useState } from "react";

const useSubmitFeedback = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");

  const submit = async () => {
    setIsLoading(true);
    submitFeedback(feedback);
    setFeedback("");
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
  };
};

export default useSubmitFeedback;
