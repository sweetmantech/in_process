interface NoPreviewProps {
  className?: string;
}

const NoPreview = ({ className = "" }: NoPreviewProps) => (
  <div
    className={`flex size-full items-center justify-center bg-white text-xl text-grey-moss-500 font-spectral ${className}`}
  >
    No preview
  </div>
);

export default NoPreview;
