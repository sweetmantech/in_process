import { getYoutubeVideoId } from "@/lib/url/getYoutubeVideoId";
import NoPreview from "@/components/NoPreview";

interface YoutubeContentProps {
  externalUrl: string;
}

const YoutubeContent = ({ externalUrl }: YoutubeContentProps) => {
  const videoId = getYoutubeVideoId(externalUrl);

  if (!videoId) return <NoPreview className="min-h-32" />;

  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="h-full w-full"
    />
  );
};

export default YoutubeContent;
