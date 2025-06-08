const MomentCount = ({ count }: { count: number }) => (
  <p className="text-center md:text-left font-archivo-medium text-2xl md:text-5xl px-4 md:px-0 pb-4 pt-12">
    {count} moments
    <br />
    have been shared
  </p>
);

export default MomentCount;
