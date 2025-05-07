interface OgWritingTokenProps {
  text: string;
}

const OgWritingToken = ({ text }: OgWritingTokenProps) => {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: "#ffffff",
        padding: "32px",
        top: 0,
        left: 0,
      }}
    >
      <p
        style={{
          fontFamily: "Spectral",
          fontSize: "24px",
          color: "#1B1504",
          textAlign: "left",
          maxWidth: "90%",
          overflow: "hidden",
          margin: 0,
          padding: 0,
          lineHeight: 1.5,
        }}
      >
        {text}
      </p>
    </div>
  );
};

export default OgWritingToken; 