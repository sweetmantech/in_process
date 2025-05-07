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
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* eslint-disable-next-line */}
      <img src={backgroundUrl} height={400} />
    </div>
  );
};

export default OgBackground;
