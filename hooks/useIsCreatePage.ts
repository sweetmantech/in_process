import { usePathname } from "next/navigation";

const useIsCreatePage = () => {
  const pathname = usePathname();
  const isCreateMode = pathname.includes("/create");

  return isCreateMode;
};

export default useIsCreatePage;
