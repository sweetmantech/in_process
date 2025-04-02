import OgImage from "../OgImage";

const OgFooter = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        paddingTop: 110,
      }}
    >
      <OgImage
        src="https://arweave.net/LrL9js9l9tT-6S06N1MtE02nCMX5gmVzGUbEVjTplo0"
        width={30}
        height={30}
        borderRadius={15}
      />
    </div>
  );
};

export default OgFooter;
