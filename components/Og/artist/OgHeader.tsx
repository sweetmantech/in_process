import OgImage from "../OgImage";

const OgHeader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        paddingBottom: 32,
      }}
    >
      <OgImage
        src="https://arweave.net/YvMzS0KHm7IFbZrb3C1pQzRaVvorLZR6eYJEpb3Vl7Q"
        width={80}
        height={80}
        borderRadius={40}
      />
      <div
        style={{
          display: "flex",
          gap: 8,
        }}
      >
        <OgImage
          src="https://arweave.net/K0BvmxnKilp4TF9TQAwHxMQ0RBwVDOVbe43XqjBpt4Y"
          width={70}
          height={70}
          borderRadius={0}
        />
        <OgImage
          src="https://arweave.net/-Kzgp5WMPd6RG6S9X4WO4Atflrc0kWIsQl18GtF1YOA"
          width={70}
          height={70}
          borderRadius={0}
        />
        <OgImage
          src="https://arweave.net/2o5wuRDeetKzSKRwLkydUydRnbk7pVNf3YKwdxBSYnQ"
          width={70}
          height={70}
          borderRadius={0}
        />
        <OgImage
          src="https://arweave.net/hFrZBu1Be1VcBryUMCJTTj8AWcFg8AvqoVs9RATez7c"
          width={70}
          height={70}
          borderRadius={0}
        />
      </div>
      <OgImage
        src="https://arweave.net/LrL9js9l9tT-6S06N1MtE02nCMX5gmVzGUbEVjTplo0"
        width={50}
        height={50}
        borderRadius={25}
      />
    </div>
  );
};

export default OgHeader;
