interface UploadProgressOverlayProps {
  uploadProgress?: number;
}

/**
 * Upload progress overlay component
 */
const UploadProgressOverlay = ({ uploadProgress }: UploadProgressOverlayProps) => (
  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-[10000]">
    <div className="text-white font-archivo-medium text-lg mb-2">Uploading...</div>
    <div className="w-3/4 bg-grey-moss-300 rounded-full h-2 overflow-hidden">
      <div
        className="bg-grey-moss-900 h-full transition-all duration-300"
        style={{ width: `${uploadProgress || 0}%` }}
      />
    </div>
    <div className="text-white font-spectral text-sm mt-2">{Math.round(uploadProgress || 0)}%</div>
  </div>
);

export default UploadProgressOverlay;
