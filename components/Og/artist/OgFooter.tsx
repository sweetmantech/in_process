interface OgFooterProps {
  ensName: string;
}
const OgFooter = ({ ensName }: OgFooterProps) => {
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
        {ensName}
      </p>
      <p
        style={{
          fontSize: 20,
          fontFamily: "Spectral",
          paddingBottom: 8,
        }}
      >
        inprocess.myco.wtf
      </p>
    </div>
  );
};

export default OgFooter;
