interface NoFileSelectedProps {
  onClick: () => void;
}

export default function NoFileSelected({ onClick }: NoFileSelectedProps) {
  return (
    <div
      onClick={onClick}
      className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
    >
      <svg
        className="w-8 h-8 mb-4 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      <span className="text-gray-500">Click to upload media</span>
    </div>
  );
}
