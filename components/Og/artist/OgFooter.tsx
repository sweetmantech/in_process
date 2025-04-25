interface OgFooterProps {
  username: string;
}
const OgFooter = ({ username }: OgFooterProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <p
        style={{
          fontSize: 24,
          fontFamily: "Archivo",
        }}
      >
        {username}
      </p>
      <p
        style={{
          fontSize: 20,
          fontFamily: "Spectral",
          paddingBottom: 8,
        }}
      >
        inprocess.fun
      </p>
    </div>
  );
};

export default OgFooter;
