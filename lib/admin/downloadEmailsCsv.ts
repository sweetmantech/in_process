import { Email } from "@/types/email";

export const downloadEmailsCsv = (emails: Email[]) => {
  const header = "address,email,artist_address,username";
  const rows = emails.map(
    (e) => `${e.address},${e.email},${e.artist_address ?? ""},${e.username ?? ""}`
  );
  const csv = [header, ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "emails.csv";
  a.click();
  URL.revokeObjectURL(url);
};
