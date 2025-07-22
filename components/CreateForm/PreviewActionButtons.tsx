import { useRef } from 'react';

interface PreviewActionButtonsProps {
  isUploading: boolean;
  onUploadClick: () => void;
  onDoneClick: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PreviewActionButtons = ({
  isUploading,
  onUploadClick,
  onDoneClick,
  onFileChange,
}: PreviewActionButtonsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        accept="image/*"
        onChange={onFileChange}
      />
      
      <button
        type="button"
        className="border border-grey-moss-900 w-3/4 mt-2 py-2 font-archivo rounded-sm 
        hover:border-grey-moss-300 hover:text-grey-eggshell hover:bg-grey-moss-300
        transform transition-transform duration-150 
        disabled:opacity-1 disabled:!cursor-not-allowed disabled:!pointer-events-auto"
        onClick={handleUploadClick}
      >
        upload thumbnail
      </button>
      
      <button
        type="button"
        className="w-3/4 mt-2 py-2 font-archivo rounded-sm bg-grey-moss-900 text-grey-eggshell
        hover:border-grey-moss-300 hover:bg-grey-moss-300
        transform transition-transform duration-150 
        disabled:opacity-1 disabled:!cursor-not-allowed disabled:!pointer-events-auto"
        onClick={onDoneClick}
        disabled={isUploading}
      >
        {isUploading ? "cropping..." : "done"}
      </button>
    </>
  );
}; 