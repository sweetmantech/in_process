import { Email } from "@/types/email";

const escapeCsvField = (value: string | null | undefined): string => {
  const str = value ?? "";
  const safe = /^[=+\-@]/.test(str) ? `'${str}` : str;
  return `"${safe.replace(/"/g, '""')}"`;
};

export const downloadEmailsCsv = (emails: Email[]) => {
  const header = "address,email,artist_address,username";
  const rows = emails.map(
    (e) =>
      `${escapeCsvField(e.address)},${escapeCsvField(e.email)},${escapeCsvField(e.artist_address)},${escapeCsvField(e.username)}`
  );
  const csv = [header, ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "emails.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
