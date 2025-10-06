import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import useSubmitFeedback from "@/hooks/useSubmitFeedback";
import FeedbackModalContents from "./FeedbackModalContents";

const FeedbackModal = () => {
  const submitFeedbackHook = useSubmitFeedback();
  const { isOpenModal, setIsOpenModal } = submitFeedbackHook;

  return (
    <Dialog open={isOpenModal} onOpenChange={() => setIsOpenModal(!isOpenModal)}>
      <DialogTrigger
        asChild
        onClick={() => setIsOpenModal(true)}
        className="disabled:cursor-not-allowed disabled:bg-grey-moss-300"
      >
        <button type="button">feedback</button>
      </DialogTrigger>
      <FeedbackModalContents submitFeedbackHook={submitFeedbackHook} />
    </Dialog>
  );
};

export default FeedbackModal;
