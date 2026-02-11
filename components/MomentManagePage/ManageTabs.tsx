import TabButton from "./TabButton";

export enum MANAGE_TABS {
  AIRDROP,
  SALE,
  MEDIA,
  ADMIN,
}
interface ManageTabsProps {
  onChangeTab: (_value: number) => void;
  selectedTab: number;
}
const ManageTabs = ({ selectedTab, onChangeTab }: ManageTabsProps) => {
  return (
    <section className="w-full pt-4 md:px-10">
      <div className="flex gap-1 md:gap-4">
        <TabButton
          label="Airdrop"
          active={selectedTab === MANAGE_TABS.AIRDROP}
          onClick={() => onChangeTab(MANAGE_TABS.AIRDROP)}
        />
        <TabButton
          label="Sale"
          active={selectedTab === MANAGE_TABS.SALE}
          onClick={() => onChangeTab(MANAGE_TABS.SALE)}
        />
        <TabButton
          label="Media"
          active={selectedTab === MANAGE_TABS.MEDIA}
          onClick={() => onChangeTab(MANAGE_TABS.MEDIA)}
        />
        <TabButton
          label="Admins"
          active={selectedTab === MANAGE_TABS.ADMIN}
          onClick={() => onChangeTab(MANAGE_TABS.ADMIN)}
        />
      </div>
    </section>
  );
};

export default ManageTabs;
