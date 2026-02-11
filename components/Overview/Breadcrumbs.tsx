import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { ReactNode } from "react";

interface BreadcrumbItem {
  label: string | ReactNode;
  href?: string;
  isLoading?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const { push } = useRouter();

  return (
    <div className="flex cursor-pointer items-center gap-2 font-archivo text-xs sm:text-lg min-w-0 max-w-full overflow-hidden">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2 min-w-0 shrink">
          {index > 0 && <span className="shrink-0">/</span>}
          {item.href ? (
            <button
              type="button"
              onClick={() => push(item.href!)}
              className={`rounded-md px-2 py-1 hover:bg-black hover:text-grey-eggshell truncate min-w-0 max-w-[120px] sm:max-w-[200px] ${
                index === 0 ? "hover:text-grey-moss-100" : ""
              }`}
            >
              {item.isLoading ? <Skeleton className="h-4 w-12 rounded-sm" /> : item.label}
            </button>
          ) : (
            <div className="rounded-md px-2 py-1 hover:bg-black hover:text-grey-eggshell truncate min-w-0 max-w-[120px] sm:max-w-[200px]">
              {item.isLoading ? <Skeleton className="h-4 w-12 rounded-sm" /> : item.label}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
