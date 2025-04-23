interface VideoPlayerProps {
  url: string;
}
const VideoPlayer = ({ url }: VideoPlayerProps) => {
  return (
    <video controls className="w-full rounded-md">
      <source src={url} />
      Your browser does not support the video element.
    </video>
  );
};

export default VideoPlayer;
