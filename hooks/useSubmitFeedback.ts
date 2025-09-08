import submitFeedback from "@/lib/submitFeedback";
import { useState } from "react";
import useConnectedWallet from "./useConnectedWallet";

export type UseSubmitFeedbackReturn = {
  submit: () => Promise<void>;
  isLoading: boolean;
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  setFeedback: (value: string) => void;
  feedback: string;
  setName: (value: string) => void;
  name: string;
};

const useSubmitFeedback = (): UseSubmitFeedbackReturn => {
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

    await submitFeedback(feedback, name, connectedWallet);
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
