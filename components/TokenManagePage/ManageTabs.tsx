import { cn } from "@/lib/utils";

export enum MANAGE_TABS {
  AIRDROP,
  SALE,
  MEDIA,
}
interface ManageTabsProps {
  onChangeTab: (value: number) => void;
  selectedTab: number;
}
const ManageTabs = ({ selectedTab, onChangeTab }: ManageTabsProps) => {
  return (
    <section className="px-4 md:px-10 w-full pt-4">
      <div className="flex gap-4">
        <button
          type="button"
          className={cn(
            "font-archivo-medium min-w-[80px]",
            selectedTab === MANAGE_TABS.AIRDROP &&
              "border-b-[2px] border-b-grey-moss-300"
          )}
          onClick={() => onChangeTab(MANAGE_TABS.AIRDROP)}
        >
          Airdrop
        </button>
        <button
          type="button"
          className={cn(
            "font-archivo-medium min-w-[80px]",
            selectedTab === MANAGE_TABS.SALE &&
              "border-b-[2px] border-b-grey-moss-300"
          )}
          onClick={() => onChangeTab(MANAGE_TABS.SALE)}
        >
          Sale
        </button>
        <button
          type="button"
          className={cn(
            "font-archivo-medium min-w-[80px]",
            selectedTab === MANAGE_TABS.MEDIA &&
              "border-b-[2px] border-b-grey-moss-300"
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
