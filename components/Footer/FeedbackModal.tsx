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
    name,
    setName,
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
        <Label className="font-archivo text-sm text-left w-full mb-1 text-grey-moss-600">
          contact name*
        </Label>
        <input
          type="text"
          placeholder="your name or email for follow-up"
          className="bg-grey-moss-50 w-full p-3 font-spectral !border-none !outline-none !ring-0 mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Label className="font-archivo text-sm text-left w-full mb-1 text-grey-moss-600">
          feedback*
        </Label>
        <textarea
          className="bg-grey-moss-50 w-full p-3 font-spectral !border-none !outline-none !ring-0"
          rows={6}
          placeholder="describe the issue or suggestion..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
        <div className="w-full ">
          <button
            type="button"
            className="py-3 bg-black hover:bg-grey-moss-300 font-archivo text-xl w-full text-grey-eggshell mt-4 disabled:cursor-not-allowed disabled:bg-grey-moss-300"
            onClick={submit}
            disabled={!Boolean(feedback.trim()) || !Boolean(name.trim()) || isLoading}
          >
            {isLoading ? "submitting..." : "submit feedback"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
