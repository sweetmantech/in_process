interface VideoPlayerProps {
  url: string;
}
const VideoPlayer = ({ url }: VideoPlayerProps) => {
  return (
    <video controls className="rounded-md w-full bg-grey-moss-900">
      <source src={url} />
      Your browser does not support the video element.
    </video>
  );
};

export default VideoPlayer;
