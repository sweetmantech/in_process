export const escapeCsvField = (value: string | null | undefined): string => {
  const str = value ?? "";
  const safe = /^[=+\-@]/.test(str) ? `'${str}` : str;
  return `"${safe.replace(/"/g, '""')}"`;
};
