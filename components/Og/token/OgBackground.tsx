interface OgBackgroundProps {
  backgroundUrl: string;
}

const OgBackground = ({ backgroundUrl }: OgBackgroundProps) => {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* eslint-disable-next-line */}
      <img
        src={backgroundUrl}
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </div>
  );
};

export default OgBackground;
