const MomentCount = ({ count }: { count: number }) => (
  <p className="font-archivo-medium text-lg md:text-5xl text-grey-600 md:text-black">
    {count} moments<br className="hidden md:block" /> have been shared
  </p>
);

export default MomentCount;
