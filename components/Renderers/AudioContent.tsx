import { AudioPlayer } from "@/components/AudioPlayer";
import ErrorContent from "./ErrorContent";

interface AudioContentProps {
  rawAnimationUri: string;
  rawImageUri: string;
}

const AudioContent = ({ rawAnimationUri, rawImageUri }: AudioContentProps) => {
  if (!rawAnimationUri) return <ErrorContent />;
  return (
    <AudioPlayer
      thumbnailUrl={rawImageUri || "/images/placeholder.png"}
      audioUrl={rawAnimationUri}
    />
  );
};

export default AudioContent;
