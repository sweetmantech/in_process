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
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      {/* eslint-disable-next-line */}
      <img
        src={backgroundUrl}
        style={{
          objectFit: "cover",
        }}
        width={500}
      />
    </div>
  );
};

export default OgBackground;
