import { OG_WIDTH, rotation } from "@/lib/og/consts";
import { ImageMetadata } from "@/types/og";

const TokenImagePreview = ({
  imageMetadata,
}: {
  imageMetadata: ImageMetadata | null;
}) => {
  if (!imageMetadata)
    return (
      <div
        style={{
          fontFamily: "Archivo",
          fontSize: 32,
          textAlign: "center",
          color: "#605F5C",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        No Preview.
      </div>
    );

  const {
    previewUrl,
    shouldRotate,
    originalHeight,
    originalWidth,
    orientation,
  } = imageMetadata;
  const paddingLeft =
    (Math.abs((OG_WIDTH / originalHeight) * originalWidth - OG_WIDTH) / 2) * -1;

  return (
    // eslint-disable-next-line
    <img
      src={previewUrl}
      style={{
        width: shouldRotate
          ? (OG_WIDTH / originalHeight) * originalWidth
          : "100%",
        transform: rotation[orientation],
        left: shouldRotate ? paddingLeft : 0,
        position: "absolute",
      }}
    />
  );
};

export default TokenImagePreview;
