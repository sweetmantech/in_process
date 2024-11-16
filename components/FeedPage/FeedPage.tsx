"use client";

const FeedPage = ({ chain, address }: { chain: string; address: string }) => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {/* Collection Info Section */}
        <div className="col-span-full bg-white/5 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Collection Information</h2>
          <div className="space-y-2">
            <p>Network: {chain}</p>
            <p>Collection Address: {address}</p>
          </div>
        </div>

        {/* Feed Items will be added here later */}
      </div>
    </div>
  );
};

export default FeedPage;
