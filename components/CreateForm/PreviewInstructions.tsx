interface PreviewInstructionsProps {
  previewUri: string;
  imageScale: number;
}

export const PreviewInstructions = ({ previewUri, imageScale }: PreviewInstructionsProps) => {
  if (!previewUri) return null;

  return (
    <div className="text-center text-sm text-grey-moss-400 mt-1">
      <p className="font-spectral-italic">click and drag to reposition</p>
      <p className="font-spectral-italic">scroll to zoom ({(imageScale * 100).toFixed(0)}%)</p>
    </div>
  );
}; 