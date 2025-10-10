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
import { toast } from "sonner";
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
      <DialogContent className="w-[calc(100vw-2rem)] max-w-xl !rounded-3xl !bg-white border-none py-10 px-8 flex flex-col items-center !gap-0 shadow-lg overflow-hidden bg-transparent z-[99999999]">
        <VisuallyHidden>
          <DialogTitle>Let us hear from you</DialogTitle>
        </VisuallyHidden>
        <DialogClose className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-grey-moss-600 hover:text-black">
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
        <h2 className="font-archivo text-2xl text-center w-full mb-2">let us hear from you</h2>
        <p className="font-archivo text-sm text-center w-full mb-6 italic text-grey-moss-600">
          how&apos;s your process?
        </p>
        <Label className="font-archivo text-sm text-left w-full mb-1 text-grey-moss-600">
          email
        </Label>
        <input
          type="email"
          placeholder=""
          className="bg-white w-full p-3 font-spectral border border-black outline-none ring-0 mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Label className="pt-3 font-archivo text-sm text-left w-full mb-1 text-grey-moss-600">
          share feedback
        </Label>
        <textarea
          className="bg-grey-moss-50 w-full p-3 font-spectral border border-black outline-none ring-0"
          rows={6}
          placeholder=""
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />

        {/* Media Upload Field */}
        <Label className="pt-3 font-archivo text-sm text-left w-full mb-1 text-grey-moss-600">
          add media (optional)
        </Label>
        <div className="w-full mb-3">
          <input
            type="file"
            accept="image/*,video/*,.pdf,.doc,.docx,.txt"
            className="hidden"
            id="media-upload"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                if (file.size > 50 * 1024 * 1024) {
                  // 50MB limit
                  toast.error("File size must be less than 50MB");
                  return;
                }
                setMediaFile(file);
                setMediaPreview(URL.createObjectURL(file));
              }
            }}
          />
          <label
            htmlFor="media-upload"
            className="cursor-pointer bg-grey-moss-50 w-full p-3 font-spectral border border-black border-dashed flex items-center justify-center text-grey-moss-600 hover:bg-grey-moss-100 transition-colors"
          >
            {mediaFile ? "change media" : "click to add media"}
          </label>

          {mediaPreview && mediaFile && (
            <FeedbackMediaAttachment
              mediaFile={mediaFile}
              mediaPreview={mediaPreview}
              onRemove={() => {
                setMediaFile(null);
                setMediaPreview(null);
              }}
            />
          )}
        </div>

        <div className="w-full ">
          <button
            type="button"
            className="py-3 bg-black hover:bg-grey-moss-300 font-archivo text-xl w-full text-grey-eggshell mt-4 disabled:cursor-not-allowed disabled:bg-grey-moss-300 rounded-lg"
            onClick={submit}
            disabled={!Boolean(feedback.trim()) || !Boolean(name.trim()) || isLoading}
          >
            {isLoading ? "sending..." : "send"}
          </button>
        </div>
      </DialogContent>
    </DialogPortal>
  );
};

export default FeedbackModalContents;
