import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface FetchMoreInspectorProps {
  fetchMore: () => void;
  className?: string;
  children?: React.ReactNode;
}
const FetchMoreInspector = ({
  fetchMore,
  children,
}: FetchMoreInspectorProps) => {
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) fetchMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div ref={ref} className="min-w-[10px] min-h-[10px]">
      {children || null}
    </div>
  );
};

export default FetchMoreInspector;
