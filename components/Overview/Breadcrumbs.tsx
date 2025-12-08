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
    <div className="flex cursor-pointer items-center gap-2 font-archivo text-lg">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <span>/</span>}
          {item.href ? (
            <button
              type="button"
              onClick={() => push(item.href!)}
              className={`rounded-md px-2 py-1 hover:bg-black hover:text-grey-eggshell ${
                index === 0 ? "hover:text-grey-moss-100" : ""
              }`}
            >
              {item.isLoading ? <Skeleton className="h-4 w-12 rounded-sm" /> : item.label}
            </button>
          ) : (
            <p className="rounded-md px-2 py-1 hover:bg-black hover:text-grey-eggshell">
              {item.isLoading ? <Skeleton className="h-4 w-12 rounded-sm" /> : item.label}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
