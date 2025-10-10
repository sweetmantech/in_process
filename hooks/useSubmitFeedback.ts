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
  setMediaFile: (file: File | null) => void;
  mediaFile: File | null;
  setMediaPreview: (url: string | null) => void;
  mediaPreview: string | null;
};

const useSubmitFeedback = (): UseSubmitFeedbackReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const { connectedWallet } = useConnectedWallet();

  const submit = async () => {
    if (!name.trim() || !feedback.trim()) {
      return;
    }
    setIsLoading(true);

    await submitFeedback(feedback, name, connectedWallet, mediaFile);
    setFeedback("");
    setName("");
    setMediaFile(null);
    setMediaPreview(null);
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
    setMediaFile,
    mediaFile,
    setMediaPreview,
    mediaPreview,
  };
};

export default useSubmitFeedback;
