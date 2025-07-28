import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import useSubmitFeedback from "@/hooks/useSubmitFeedback";

const FeedbackModal = () => {
  const {
    isOpenModal,
    setIsOpenModal,
    feedback,
    setFeedback,
    isLoading,
    submit,
  } = useSubmitFeedback();

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
      <DialogContent className="max-w-xl !rounded-3xl !bg-white border-none py-10 px-8 flex flex-col items-center !gap-0 shadow-lg overflow-hidden bg-transparent">
        <VisuallyHidden>
          <DialogTitle>Leave feedback</DialogTitle>
        </VisuallyHidden>
        <Label className="font-archivo text-lg text-left w-full">
          leave feedback
        </Label>
        <textarea
          className="bg-grey-moss-50 w-full p-3 font-spectral !border-none !outline-none !ring-0"
          rows={6}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <div className="w-full ">
          <button
            type="button"
            className="py-3 bg-black hover:bg-grey-moss-300 font-archivo text-xl w-full text-grey-eggshell mt-4 disabled:cursor-not-allowed disabled:bg-grey-moss-300"
            onClick={submit}
            disabled={!Boolean(feedback) || isLoading}
          >
            {isLoading ? "submitting..." : "submit feedback"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
