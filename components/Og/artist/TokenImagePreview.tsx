import { ARTIST_OG_IMAGE_WIDTH, rotation } from "@/lib/og/consts";
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
    (Math.abs(
      (ARTIST_OG_IMAGE_WIDTH / originalHeight) * originalWidth -
        ARTIST_OG_IMAGE_WIDTH,
    ) /
      2) *
    -1;
  const style: any = {
    transform: rotation[orientation],
    left: shouldRotate ? paddingLeft : 0,
  };
  if (originalWidth > originalHeight) style.height = "100%";
  else
    style.width = shouldRotate
      ? (ARTIST_OG_IMAGE_WIDTH / originalHeight) * originalWidth
      : "100%";
  return (
    // eslint-disable-next-line
    <img src={previewUrl} style={style} />
  );
};

export default TokenImagePreview;
