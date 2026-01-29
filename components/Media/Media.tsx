import dynamic from "next/dynamic";
import MediaSkeleton from "./MediaSkeleton";

export const Media = dynamic(() => import("./MediaInner"), {
  ssr: false,
  loading: () => <MediaSkeleton />,
});
