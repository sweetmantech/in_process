"use client";

import "@google/model-viewer";

import { Skeleton } from "@/components/ui/skeleton";

import { useHasMounted } from "@/hooks/useHasMounted";
import { isWebGLAvailable } from "@/lib/media/isWebGLAvailable";

import ErrorContent from "./ErrorContent";
import GlbWebGLFallback from "./GlbWebGLFallback";

interface GlbContentProps {
  animationLoading: boolean;
  animationUrl: string | null;
  poster?: string;
  alt?: string;
  variant?: "fill" | "natural";
}

const GlbContent = ({
  animationLoading,
  animationUrl,
  poster,
  alt,
  variant = "fill",
}: GlbContentProps) => {
  const mounted = useHasMounted();

  if (animationLoading) return <Skeleton className="size-full min-h-[280px]" />;
  if (!animationUrl) return <ErrorContent />;
  if (!mounted) return <Skeleton className="size-full min-h-[280px]" />;

  if (!isWebGLAvailable()) {
    return <GlbWebGLFallback animationUrl={animationUrl} poster={poster} variant={variant} />;
  }

  const viewerStyle =
    variant === "fill"
      ? { width: "100%", height: "100%", minHeight: 280 }
      : { width: "100%", height: "min(70vh, 640px)" };

  const shellClass =
    variant === "fill"
      ? "relative size-full min-h-[280px] overflow-hidden rounded-lg border border-grey-moss-100 bg-grey-moss-50"
      : "relative w-full overflow-hidden rounded-lg border border-grey-moss-100 bg-grey-moss-50";

  return (
    <div className={shellClass}>
      <model-viewer
        alt={alt ?? "3D model"}
        auto-rotate
        camera-controls
        poster={poster}
        shadow-intensity="1"
        src={animationUrl}
        style={viewerStyle}
      />
    </div>
  );
};

export default GlbContent;
