import {
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { UseSubmitFeedbackReturn } from "@/hooks/useSubmitFeedback";
import FeedbackMediaAttachment from "./FeedbackMediaAttachment";

interface FeedbackModalContentsProps {
  submitFeedbackHook: UseSubmitFeedbackReturn;
}

const FeedbackModalContents = ({ submitFeedbackHook }: FeedbackModalContentsProps) => {
  const {
    feedback,
    setFeedback,
    name,
    setName,
    isLoading,
    submit,
    mediaFile,
    setMediaFile,
    mediaPreview,
    setMediaPreview,
  } = submitFeedbackHook;

  return (
    <DialogPortal>
      <DialogOverlay className="fixed inset-0 z-[99999999] bg-black/20 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogContent className="z-[99999999] flex w-[calc(100vw-2rem)] max-w-xl flex-col items-center !gap-0 overflow-hidden !rounded-3xl border-none !bg-white bg-transparent px-8 py-10 shadow-lg">
        <VisuallyHidden>
          <DialogTitle>Let us hear from you</DialogTitle>
        </VisuallyHidden>
        <DialogClose className="text-grey-moss-600 absolute right-4 top-4 flex h-6 w-6 items-center justify-center hover:text-black">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </DialogClose>
        <h2 className="mb-2 w-full text-center font-archivo text-2xl">let us hear from you</h2>
        <p className="text-grey-moss-600 mb-6 w-full text-center font-archivo text-sm italic">
          how&apos;s your process?
        </p>
        <Label className="text-grey-moss-600 mb-1 w-full text-left font-archivo text-sm">
          email
        </Label>
        <input
          type="email"
          placeholder=""
          className="mb-3 w-full border border-black bg-white p-3 font-spectral outline-none ring-0"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Label className="text-grey-moss-600 mb-1 w-full pt-3 text-left font-archivo text-sm">
          share feedback
        </Label>
        <textarea
          className="w-full border border-black bg-grey-moss-50 p-3 font-spectral outline-none ring-0"
          rows={6}
          placeholder=""
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />

        <FeedbackMediaAttachment
          mediaFile={mediaFile}
          mediaPreview={mediaPreview}
          onMediaChange={(file, preview) => {
            setMediaFile(file);
            setMediaPreview(preview);
          }}
        />

        <div className="w-full">
          <button
            type="button"
            className="mt-4 w-full rounded-lg bg-black py-3 font-archivo text-xl text-grey-eggshell hover:bg-grey-moss-300 disabled:cursor-not-allowed disabled:bg-grey-moss-300"
            onClick={submit}
            disabled={!feedback.trim() || !name.trim() || isLoading}
          >
            {isLoading ? "sending..." : "send"}
          </button>
        </div>
      </DialogContent>
    </DialogPortal>
  );
};

export default FeedbackModalContents;
