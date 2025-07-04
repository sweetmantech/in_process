import useIsMobile from "@/hooks/useIsMobile";

const SearchNotFound = () => {
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && <hr className="w-full border-grey-moss-300" />}
      <div
        className={
          isMobile
            ? "w-fit h-fit absolute right-0 -bottom-[58px] py-2 px-3 bg-white rounded-sm"
            : ""
        }
      >
        <div
          className={`flex flex-col w-full items-center ${!isMobile ? "pt-4 px-4" : ""}`}
        >
          <p className={`t-grey-moss-300 text-sm ${isMobile ? "p-0" : ""}`}>
            no results in the matrix, search again
          </p>
        </div>
      </div>
    </>
  );
};

export default SearchNotFound;
