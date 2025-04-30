import { VERCEL_OG } from "@/lib/consts";
import OgImage from "../OgImage";

const OgFooter = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        paddingTop: 160,
      }}
    >
      <OgImage
        src={`${VERCEL_OG}/favicon_grey.png`}
        width={30}
        height={30}
        borderRadius={15}
      />
    </div>
  );
};

export default OgFooter;
