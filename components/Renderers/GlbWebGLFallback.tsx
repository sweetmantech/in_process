interface GlbWebGLFallbackProps {
  animationUrl: string;
  poster?: string;
  variant?: "fill" | "natural";
}

const GlbWebGLFallback = ({ animationUrl, poster, variant = "fill" }: GlbWebGLFallbackProps) => {
  const wrapper =
    variant === "fill"
      ? "relative flex size-full min-h-[280px] flex-col items-center justify-center gap-4 bg-black/20 px-4 py-8"
      : "relative flex w-full flex-col items-center justify-center gap-4 px-4 py-8";

  return (
    <div className={wrapper}>
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element -- arbitrary NFT gateway / blob URLs
        <img
          src={poster}
          alt=""
          className="max-h-[min(70vh,520px)] w-full max-w-4xl object-contain"
        />
      ) : null}
      <div className="flex max-w-md flex-col items-center gap-3 text-center">
        <p className="text-grey-moss-400 text-sm leading-relaxed">
          This environment can&apos;t run interactive 3D (WebGL). Try another browser or device, or
          open the model below.
        </p>
        <a
          href={animationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary text-sm font-medium underline underline-offset-4"
        >
          Open model file
        </a>
      </div>
    </div>
  );
};

export default GlbWebGLFallback;
