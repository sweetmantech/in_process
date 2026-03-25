"use client";

import MessagesTable from "./MessagesTable";

const AdminMessagesPage = () => {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Messages</h1>
      <MessagesTable />
    </div>
  );
};

export default AdminMessagesPage;
