const TokenWritingPreview = ({
  writingText,
  totalLines,
}: {
  writingText: string;
  totalLines: number;
}) => {
  const WRITING_MAX_LINES = 6;
  const WRITING_SHORT_LINES = 2;
  return (
    <div
      style={{
        display: "flex",
        paddingTop: 24,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: totalLines > WRITING_MAX_LINES ? 0 : 24,
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: totalLines > WRITING_MAX_LINES ? "flex-start" : "center",
          justifyContent: totalLines > 1 ? "flex-start" : "center",
        }}
      >
        <pre
          style={{
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
            fontFamily: "Spectral",
            fontSize: totalLines <= WRITING_SHORT_LINES ? 32 : 16,
          }}
        >
          {writingText}
        </pre>
      </div>
      {totalLines > WRITING_MAX_LINES && (
        <div
          style={{
            position: "absolute",
            left: 32,
            bottom: 0,
            width: "100%",
            height: "50%",
            backgroundImage:
              "linear-gradient(180deg, rgba(224, 221, 216, 0) 0%, rgba(224, 221, 216, 1) 100%)",
          }}
        />
      )}
    </div>
  );
};

export default TokenWritingPreview;
