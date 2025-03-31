import OgImage from "../OgImage";

interface OgHeaderProps {
  ensAvatar: string;
  comments: number;
  ensName: string;
}
const OgHeader = ({ ensAvatar, comments, ensName }: OgHeaderProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        paddingBottom: 32,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <OgImage src={ensAvatar} width={50} height={50} borderRadius={50} />
        <p
          style={{
            fontFamily: "Spectral",
            lineHeight: "100%",
            fontSize: 24,
            color: "white",
          }}
        >
          @{ensName}
        </p>
      </div>
      <div
        style={{
          background: "#00000040",
          paddingLeft: 12,
          paddingRight: 12,
          borderRadius: 4,
          paddingTop: 4,
          paddingBottom: 4,
          height: 30,
          width: 90,
          display: "flex",
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          stroke-width="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
        <p
          style={{
            lineHeight: "100%",
            fontFamily: "Archivo",
            color: "white",
          }}
        >
          {comments}
        </p>
      </div>
    </div>
  );
};

export default OgHeader;
