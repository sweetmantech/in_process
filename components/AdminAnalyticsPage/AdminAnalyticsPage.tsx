"use client";

import MomentCreationsTable from "./MomentCreationsTable";

const AdminAnalyticsPage = () => {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Admin Analytics</h1>
      <MomentCreationsTable />
    </div>
  );
};

export default AdminAnalyticsPage;
