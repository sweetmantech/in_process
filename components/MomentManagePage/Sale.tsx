import dynamic from "next/dynamic";
import SaleSkeleton from "./SaleSkeleton";

const Sale = dynamic(() => import("./SaleInner"), {
  ssr: false,
  loading: () => <SaleSkeleton />,
});

export default Sale;
