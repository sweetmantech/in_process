import useIsMobile from "@/hooks/useIsMobile";

const SearchNotFound = () => {
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && <hr className="w-full border-grey-moss-300" />}
      <div
        className={
          isMobile
            ? "absolute -bottom-[58px] right-0 h-fit w-fit rounded-sm bg-white px-3 py-2"
            : ""
        }
      >
        <div className={`flex w-full flex-col items-center ${!isMobile ? "px-4 pt-4" : ""}`}>
          <p className={`t-grey-moss-300 text-sm ${isMobile ? "p-0" : ""}`}>
            no results in the matrix, search again
          </p>
        </div>
      </div>
    </>
  );
};

export default SearchNotFound;
