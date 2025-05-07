import { rotation } from "@/lib/og/consts";

interface OgBackgroundProps {
  backgroundUrl: string;
  orientation: number;
}

const OgBackground = ({ backgroundUrl, orientation }: OgBackgroundProps) => {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* eslint-disable-next-line */}
      <img
        src={backgroundUrl}
        style={{
          objectFit: "cover",
          objectPosition: "center",
          transform: rotation[orientation],
        }}
      />
    </div>
  );
};

export default OgBackground;
