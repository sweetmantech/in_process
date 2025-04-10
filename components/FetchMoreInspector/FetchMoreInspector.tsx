import { useInView } from "react-intersection-observer";
import Loading from "../Loading";
import { useEffect } from "react";

interface FetchMoreInspectorProps {
  fetchMore: () => void;
  className?: string;
}
const FetchMoreInspector = ({
  fetchMore,
  className = "",
}: FetchMoreInspectorProps) => {
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) fetchMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div ref={ref}>
      <Loading className={`size-8 ${className}`} />
    </div>
  );
};

export default FetchMoreInspector;
