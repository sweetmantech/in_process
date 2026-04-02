import TabButton from "./TabButton";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { Protocol } from "@/types/moment";

export enum COLLECTION_MANAGE_TABS {
  MEDIA,
  ADMINS,
}

interface TabsProps {
  selectedTab: number;
  onChangeTab: (_value: number) => void;
}

const Tabs = ({ selectedTab, onChangeTab }: TabsProps) => {
  const { data } = useCollectionProvider();
  const hideNonMedia = data?.protocol === Protocol.SoundXyz || data?.protocol === Protocol.Catalog;

  return (
    <section className="w-full px-2 pt-4 md:px-10">
      <div className="flex gap-1 md:gap-4">
        <TabButton
          label="Media"
          active={selectedTab === COLLECTION_MANAGE_TABS.MEDIA}
          onClick={() => onChangeTab(COLLECTION_MANAGE_TABS.MEDIA)}
        />
        {!hideNonMedia && (
          <TabButton
            label="Admins"
            active={selectedTab === COLLECTION_MANAGE_TABS.ADMINS}
            onClick={() => onChangeTab(COLLECTION_MANAGE_TABS.ADMINS)}
          />
        )}
      </div>
    </section>
  );
};

export default Tabs;
