import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { ChevronDown, ChevronUp } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const MobileSelect = () => {
  const { titleRef } = useZoraCreateProvider();
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);
  const { push } = useRouter();
  const pathname = usePathname();
  const baseRoute = "/create";
  const selectedValue = useMemo(() => {
    if (pathname === "/create") return "moment";
    if (pathname === "/create/writing") return "thought";
    if (pathname === "/create/link") return "link";
    if (pathname === "/create/embed") return "embed";
  }, [pathname]);

  const values = useMemo(() => {
    const defaultValues = ["moment", "thought", "link", "embed"];
    if (!selectedValue) return [];
    return [
      selectedValue,
      ...defaultValues.filter((value: string) => value !== selectedValue),
    ];
  }, [selectedValue]);

  const handleClick = (value: string) => {
    if (value === "moment") push(baseRoute);
    if (value === "thought") push(`${baseRoute}/writing`);
    if (value !== "moment" && value !== "thought") push(`${baseRoute}/${value}`);
    setIsOpenSelect(false);
  };
  return (
    <div className="relative w-full" ref={titleRef}>
      {isOpenSelect ? (
        <div className="absolute left-0 top-0 z-[999999999] w-full bg-white rounded-md border border-grey-moss-300 overflow-hidden p-2 flex flex-col gap-1">
          {values.map((value: string) => (
            <button
              type="button"
              key={value}
              onClick={() => handleClick(value)}
              className="flex justify-between"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 border border-grey-moss-400 rounded-full ${selectedValue === value ? "bg-grey-moss-400" : ""}`}
                />
                <p className="font-archivo text-lg">new {value}</p>
              </div>
              {selectedValue === value && (
                <ChevronUp className="text-grey-moss-400" />
              )}
            </button>
          ))}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpenSelect(true)}
          className="bg-[#605f5c33] flex justify-between items-center px-2 py-2 rounded-md border border-grey-moss-300 w-full"
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-4 h-4 border border-grey-moss-400 rounded-full bg-grey-moss-400`}
            />
            <p className="font-archivo text-lg">new {selectedValue}</p>
          </div>
          <ChevronDown className="text-grey-moss-400" />
        </button>
      )}
    </div>
  );
};

export default MobileSelect;
