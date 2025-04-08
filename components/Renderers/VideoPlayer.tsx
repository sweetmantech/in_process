interface VideoPlayerProps {
  mimeType: string;
  url: string;
}
const VideoPlayer = ({ url, mimeType }: VideoPlayerProps) => {
  return (
    <video controls className="w-full rounded-md">
      <source src={url} type={mimeType} />
      Your browser does not support the video element.
    </video>
  );
};

export default VideoPlayer;
