interface VideoPlayerProps {
  url: string;
}
const VideoPlayer = ({ url }: VideoPlayerProps) => {
  const stopPropagation = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <video
      controls
      className="w-full rounded-md bg-grey-moss-900"
      onClick={stopPropagation}
      onMouseDown={stopPropagation}
      onPointerDown={stopPropagation}
      onTouchStart={stopPropagation}
      onTouchEnd={stopPropagation}
      onDoubleClick={stopPropagation}
    >
      <source src={url} />
      Your browser does not support the video element.
    </video>
  );
};

export default VideoPlayer;
