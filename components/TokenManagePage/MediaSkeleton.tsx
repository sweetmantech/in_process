const MediaSkeleton = () => {
  return (
    <div className="w-full px-4 pt-4 md:px-10">
      <div className="animate-pulse">
        <div className="mb-4 h-4 w-1/4 rounded bg-grey-moss-200"></div>
        <div className="mb-4 h-64 rounded bg-grey-moss-200"></div>
        <div className="space-y-2">
          <div className="h-4 rounded bg-grey-moss-200"></div>
          <div className="h-4 w-3/4 rounded bg-grey-moss-200"></div>
        </div>
      </div>
    </div>
  );
};

export default MediaSkeleton;
