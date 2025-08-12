const MediaSkeleton = () => {
  return (
    <div className="px-4 md:px-10 w-full pt-4">
      <div className="animate-pulse">
        <div className="h-4 bg-grey-moss-200 rounded w-1/4 mb-4"></div>
        <div className="h-64 bg-grey-moss-200 rounded mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-grey-moss-200 rounded"></div>
          <div className="h-4 bg-grey-moss-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default MediaSkeleton;
