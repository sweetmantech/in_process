const FilmPlaceholder = () => {
  return (
    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Film strip left */}
      <div className="absolute left-0 top-0 flex h-full w-[10%] min-w-6 flex-col justify-between bg-neutral-800 py-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`l-${i}`} className="mx-[15%] h-[6%] rounded-sm bg-neutral-600/40" />
        ))}
      </div>

      {/* Film strip right */}
      <div className="absolute right-0 top-0 flex h-full w-[10%] min-w-6 flex-col justify-between bg-neutral-800 py-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`r-${i}`} className="mx-[15%] h-[6%] rounded-sm bg-neutral-600/40" />
        ))}
      </div>

      {/* Center film frame area */}
      <div className="relative flex size-16 items-center justify-center rounded-full bg-neutral-700/50">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-neutral-400"
        >
          <rect x="2" y="2" width="20" height="20" rx="2" />
          <path d="M7 2v20" />
          <path d="M17 2v20" />
          <path d="M2 7h5" />
          <path d="M2 12h20" />
          <path d="M2 17h5" />
          <path d="M17 7h5" />
          <path d="M17 17h5" />
        </svg>
      </div>

      {/* Subtle shine */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent" />
    </div>
  );
};

export default FilmPlaceholder;
