const MomentCount = ({ count }: { count: number }) => (
  <p className="font-archivo-medium text-2xl md:text-5xl text-black">
    {count} moments
    <br />
    have been shared
  </p>
);

export default MomentCount;
