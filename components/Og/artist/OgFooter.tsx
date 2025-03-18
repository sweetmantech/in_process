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
        }}
      >
        {ensName}
      </p>
      <p
        style={{
          fontSize: 20,
        }}
      >
        inprocess.myco.wtf
      </p>
    </div>
  );
};

export default OgFooter;
