import { useEffect, useRef } from "react";

const FetchMore = ({ fetchMore }: { fetchMore: () => void }) => {
  const fetchRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isFetchingRef.current) {
          isFetchingRef.current = true;
          fetchMore();
          // Reset the flag after a short delay to allow for new fetches
          setTimeout(() => {
            isFetchingRef.current = false;
          }, 1000);
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = fetchRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchMore]);

  return <div className="min-w-[10px] min-h-[5px] bg-transparent" ref={fetchRef} />;
};

export default FetchMore;
