interface UploadProgressOverlayProps {
  uploadProgress?: number;
}

/**
 * Upload progress overlay component
 */
const UploadProgressOverlay = ({ uploadProgress }: UploadProgressOverlayProps) => (
  <div className="absolute inset-0 z-[10000] flex flex-col items-center justify-center bg-black/50">
    <div className="mb-2 font-archivo-medium text-lg text-white">Uploading...</div>
    <div className="h-2 w-3/4 overflow-hidden rounded-full bg-grey-moss-300">
      <div
        className="h-full bg-grey-moss-900 transition-all duration-300"
        style={{ width: `${uploadProgress || 0}%` }}
      />
    </div>
    <div className="mt-2 font-spectral text-sm text-white">{Math.round(uploadProgress || 0)}%</div>
  </div>
);

export default UploadProgressOverlay;
