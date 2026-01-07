import { usePathname } from "next/navigation";

const useIsCreateMode = () => {
  const pathname = usePathname();
  const isCreateMode = pathname.includes("/create");

  return isCreateMode;
};

export default useIsCreateMode;
