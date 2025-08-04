import submitFeedback from "@/lib/submitFeedback";
import { useState } from "react";
import useConnectedWallet from "./useConnectedWallet";

const useSubmitFeedback = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const [name, setName] = useState<string>("");
  const { connectedWallet } = useConnectedWallet();


  const submit = async () => {
    if (!name.trim() || !feedback.trim()) {
      return;
    }
    setIsLoading(true);
    
    const currentWallet = connectedWallet;
    
    await submitFeedback(feedback, name, currentWallet);
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
