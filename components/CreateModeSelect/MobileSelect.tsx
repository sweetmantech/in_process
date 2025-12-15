import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import useTypeParam from "@/hooks/useTypeParam";
import { useMemo, useState } from "react";

const MobileSelect = () => {
  const { titleRef } = useMetadataFormProvider();
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);
  const { push } = useRouter();
  const type = useTypeParam();
  const baseRoute = "/create";
  const selectedValue = useMemo(() => {
    if (!type) return "moment";
    if (type === "writing") return "thought";
    if (type === "link") return "link";
    if (type === "embed") return "embed";
  }, [type]);

  const values = useMemo(() => {
    const defaultValues = ["moment", "thought", "link", "embed"];
    if (!selectedValue) return [];
    return [selectedValue, ...defaultValues.filter((value: string) => value !== selectedValue)];
  }, [selectedValue]);

  const handleClick = (value: string) => {
    if (value === "moment") push(baseRoute);
    if (value === "thought") push(`${baseRoute}?type=writing`);
    if (value === "link") push(`${baseRoute}?type=link`);
    if (value === "embed") push(`${baseRoute}?type=embed`);
    setIsOpenSelect(false);
  };
  return (
    <div className="relative w-full" ref={titleRef}>
      {isOpenSelect ? (
        <div className="absolute left-0 top-0 z-[999999999] flex w-full flex-col gap-1 overflow-hidden rounded-md border border-grey-moss-300 bg-white p-2">
          {values.map((value: string) => (
            <button
              type="button"
              key={value}
              onClick={() => handleClick(value)}
              className="flex justify-between"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`h-4 w-4 rounded-full border border-grey-moss-400 ${selectedValue === value ? "bg-grey-moss-400" : ""}`}
                />
                <p className="font-archivo text-lg">new {value}</p>
              </div>
              {selectedValue === value && <ChevronUp className="text-grey-moss-400" />}
            </button>
          ))}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpenSelect(true)}
          className="flex w-full items-center justify-between rounded-md border border-grey-moss-300 bg-[#605f5c33] px-2 py-2"
        >
          <div className="flex items-center gap-2">
            <div className={`h-4 w-4 rounded-full border border-grey-moss-400 bg-grey-moss-400`} />
            <p className="font-archivo text-lg">new {selectedValue}</p>
          </div>
          <ChevronDown className="text-grey-moss-400" />
        </button>
      )}
    </div>
  );
};

export default MobileSelect;
