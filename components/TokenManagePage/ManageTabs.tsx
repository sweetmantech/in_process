import { cn } from "@/lib/utils";

export enum MANAGE_TABS {
  AIRDROP,
  SALE,
  MEDIA,
}
interface ManageTabsProps {
  onChangeTab: (_value: number) => void;
  selectedTab: number;
}
const ManageTabs = ({ selectedTab, onChangeTab }: ManageTabsProps) => {
  return (
    <section className="w-full px-4 pt-4 md:px-10">
      <div className="flex gap-4">
        <button
          type="button"
          className={cn(
            "min-w-[80px] font-archivo-medium",
            selectedTab === MANAGE_TABS.AIRDROP && "border-b-[2px] border-b-grey-moss-300"
          )}
          onClick={() => onChangeTab(MANAGE_TABS.AIRDROP)}
        >
          Airdrop
        </button>
        <button
          type="button"
          className={cn(
            "min-w-[80px] font-archivo-medium",
            selectedTab === MANAGE_TABS.SALE && "border-b-[2px] border-b-grey-moss-300"
          )}
          onClick={() => onChangeTab(MANAGE_TABS.SALE)}
        >
          Sale
        </button>
        <button
          type="button"
          className={cn(
            "min-w-[80px] font-archivo-medium",
            selectedTab === MANAGE_TABS.MEDIA && "border-b-[2px] border-b-grey-moss-300"
          )}
          onClick={() => onChangeTab(MANAGE_TABS.MEDIA)}
        >
          Media
        </button>
      </div>
    </section>
  );
};

export default ManageTabs;
