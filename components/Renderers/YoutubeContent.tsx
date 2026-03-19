interface YoutubeContentProps {
  videoId: string;
}

const YoutubeContent = ({ videoId }: YoutubeContentProps) => {
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
