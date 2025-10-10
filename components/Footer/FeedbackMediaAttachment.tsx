interface FeedbackMediaAttachmentProps {
  mediaFile: File;
  mediaPreview: string;
  onRemove: () => void;
}

const FeedbackMediaAttachment = ({
  mediaFile,
  mediaPreview,
  onRemove,
}: FeedbackMediaAttachmentProps) => {
  const renderMediaPreview = () => {
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
    <div className="mt-2 relative">
      {renderMediaPreview()}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs hover:bg-grey-moss-300"
      >
        ×
      </button>
    </div>
  );
};

export default FeedbackMediaAttachment;
