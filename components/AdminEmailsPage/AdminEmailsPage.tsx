"use client";

import EmailsTable from "./EmailsTable";

const AdminEmailsPage = () => {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Admin Emails</h1>
      <EmailsTable />
    </div>
  );
};

export default AdminEmailsPage;
