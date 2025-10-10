import { Label } from "@/components/ui/label";
import { TELEGRAM_MAX_FILE_SIZE } from "@/lib/consts";
import { toast } from "sonner";

interface FeedbackMediaAttachmentProps {
  mediaFile: File | null;
  mediaPreview: string | null;
  onMediaChange: (file: File | null, preview: string | null) => void;
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

  const renderMediaPreview = () => {
    if (!mediaFile || !mediaPreview) return null;

    if (mediaFile.type.startsWith("image/")) {
      return (
        <img
          src={mediaPreview}
          alt="Preview"
          className="w-full h-32 object-cover border border-black"
        />
      );
    }

    if (mediaFile.type.startsWith("video/")) {
      return (
        <video
          src={mediaPreview}
          className="w-full h-32 object-cover border border-black"
          controls
        />
      );
    }

    // Default case for documents and other file types
    return (
      <div className="w-full h-32 bg-grey-moss-50 border border-black flex items-center justify-center">
        <span className="font-spectral text-sm">{mediaFile.name}</span>
      </div>
    );
  };

  return (
    <div className="w-full mb-3">
      <Label className="pt-3 font-archivo text-sm text-left w-full mb-1 text-grey-moss-600">
        add media (optional)
      </Label>

      <input
        type="file"
        accept="image/*,video/*,.pdf,.doc,.docx,.txt"
        className="hidden"
        id="media-upload"
        onChange={handleFileChange}
      />

      <label
        htmlFor="media-upload"
        className="cursor-pointer bg-grey-moss-50 w-full p-3 font-spectral border border-black border-dashed flex items-center justify-center text-grey-moss-600 hover:bg-grey-moss-100 transition-colors"
      >
        {mediaFile ? "change media" : "click to add media"}
      </label>

      {mediaPreview && mediaFile && (
        <div className="mt-2 relative">
          {renderMediaPreview()}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-1 right-1 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs hover:bg-grey-moss-300"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackMediaAttachment;
