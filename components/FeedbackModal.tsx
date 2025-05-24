import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const FeedbackModal = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");

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
        <button type="button">leave feedback</button>
      </DialogTrigger>
      <DialogContent className="max-w-xl !rounded-3xl !bg-white border-none py-10 px-8 flex flex-col items-center !gap-0 shadow-lg overflow-hidden bg-transparent">
        <VisuallyHidden>
          <DialogTitle>Leave feedback</DialogTitle>
        </VisuallyHidden>
        <Label className="font-archivo text-lg text-left w-full">
          feedback
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
            className="py-3 bg-black hover:bg-grey-moss-300 font-archivo text-xl w-full text-tan-secondary mt-4"
          >
            submit feedback
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
