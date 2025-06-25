const MomentCount = ({ count }: { count: number }) => (
  <p className="font-archivo-medium text-lg md:text-5xl text-grey-moss-400 md:text-black">
    {count} moments<br className="hidden md:block" /> have been shared
  </p>
);

export default MomentCount;
