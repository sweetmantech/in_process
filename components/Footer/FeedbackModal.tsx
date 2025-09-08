import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import useSubmitFeedback from "@/hooks/useSubmitFeedback";
import FeedbackModalContents from "./FeedbackModalContents";

const FeedbackModal = () => {
  const { isOpenModal, setIsOpenModal } = useSubmitFeedback();

  return (
    <Dialog
      open={isOpenModal}
      onOpenChange={() => setIsOpenModal(!isOpenModal)}
    >
      <DialogTrigger
        asChild
        onClick={() => setIsOpenModal(true)}
        className="disabled:cursor-not-allowed disabled:bg-grey-moss-300"
      >
        <button type="button">feedback</button>
      </DialogTrigger>
      <FeedbackModalContents />
    </Dialog>
  );
};

export default FeedbackModal;
