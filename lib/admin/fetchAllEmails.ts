import { Email } from "@/types/email";
import { fetchEmails } from "./fetchEmails";

export async function fetchAllEmails(accessToken: string): Promise<Email[]> {
  const all: Email[] = [];
  let cursor: string | undefined = undefined;

  do {
    const page = await fetchEmails(accessToken, cursor);
    all.push(...page.emails);
    cursor = page.next_cursor ?? undefined;
  } while (cursor);

  return all;
}
