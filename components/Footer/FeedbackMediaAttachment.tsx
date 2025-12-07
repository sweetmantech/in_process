import { Label } from "@/components/ui/label";
import { TELEGRAM_MAX_FILE_SIZE } from "@/lib/consts";
import { toast } from "sonner";

interface FeedbackMediaAttachmentProps {
  mediaFile: File | null;
  mediaPreview: string | null;
  onMediaChange: (_file: File | null, _preview: string | null) => void;
}

const FeedbackMediaAttachment = ({
  mediaFile,
  mediaPreview,
  onMediaChange,
}: FeedbackMediaAttachmentProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > TELEGRAM_MAX_FILE_SIZE) {
        toast.error("File size must be less than 50MB");
        return;
      }
      onMediaChange(file, URL.createObjectURL(file));
    }
  };

  const handleRemove = () => {
    onMediaChange(null, null);
  };

  return (
    <div className="mb-3 w-full">
      <Label className="text-grey-moss-600 mb-1 w-full pt-3 text-left font-archivo text-sm">
        add media (optional)
      </Label>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="media-upload"
        onChange={handleFileChange}
      />

      <label
        htmlFor="media-upload"
        className="text-grey-moss-600 flex w-full cursor-pointer items-center justify-center border border-dashed border-black bg-grey-moss-50 p-3 font-spectral transition-colors hover:bg-grey-moss-100"
      >
        {mediaFile ? "change media" : "click to add media"}
      </label>

      {mediaPreview && mediaFile && (
        <div className="relative mt-2">
          {mediaFile && mediaPreview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mediaPreview}
              alt="Preview"
              className="h-32 w-full border border-black object-cover"
            />
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs text-white hover:bg-grey-moss-300"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackMediaAttachment;
