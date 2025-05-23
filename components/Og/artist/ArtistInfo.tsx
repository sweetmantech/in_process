const ArtistInfo = ({ nickName }: { nickName: string }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "30%",
        flexDirection: "column",
      }}
    >
      {/* eslint-disable-next-line */}
      <img
        src="https://arweave.net/GlRVqkN9sLPSmN09CSLTAgc5lW-GaUg23I0-wRd2MwI"
        width="100%"
      />
      <p
        style={{
          fontFamily: "Archivo",
          fontSize: 18,
        }}
      >
        {nickName}
      </p>
    </div>
  );
};

export default ArtistInfo;
