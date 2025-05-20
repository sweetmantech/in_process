import useIsMobile from "@/hooks/useIsMobile";
import SearchModal from "./SearchModal";
import SearchInput from "./SearchInput";

const ArtistSearch = () => {
  const isMobile = useIsMobile();
  if (isMobile) return <SearchInput />;
  return <SearchModal />;
};

export default ArtistSearch;
