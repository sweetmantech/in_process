interface OgImageProps {
  width: number;
  height: number;
  borderRadius: number;
  src: string;
}

const OgImage = ({ width, height, borderRadius, src }: OgImageProps) => {
  return (
    <div
      style={{
        display: "flex",
        borderRadius,
        width,
        height,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* eslint-disable-next-line */}
      <img
        src={src}
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </div>
  );
};

export default OgImage;
