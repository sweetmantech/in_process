interface AudioPlayerProps {
  onClick: () => void;
}

export default function AudioPlayer({ onClick }: AudioPlayerProps) {
  return (
    <div
      onClick={onClick}
      className="absolute inset-0 flex items-center justify-center cursor-pointer"
    >
      <svg
        className="w-16 h-16 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19V5l12 7-12 7z"
        />
      </svg>
    </div>
  );
}
