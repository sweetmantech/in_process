"use client";

import ArtistsTable from "./ArtistsTable";

const AdminArtistsPage = () => {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Admin Artists</h1>
      <ArtistsTable />
    </div>
  );
};

export default AdminArtistsPage;
