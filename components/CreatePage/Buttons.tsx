const Buttons = () => {
  return (
    <div className="space-y-2 pt-3">
      <button
        type="button"
        className="w-full py-2 bg-black font-archivo text-tan-primary rounded-sm"
      >
        Share
      </button>
      <button
        type="button"
        className="w-full py-2 font-archivo text-black border border-black rounded-sm"
      >
        Create
      </button>
    </div>
  );
};

export default Buttons;
