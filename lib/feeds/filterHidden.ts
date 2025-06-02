import { Moment } from "@/hooks/useTimeline";

/**
 * Filters out feeds that are hidden according to hiddenMoments.
 * Handles tokenId as string or number.
 */
export function filterHiddenFeeds<
  T extends { collection: string; tokenId: string | number },
>(feeds: T[], hiddenMoments: Moment[]): T[] {
  return feeds.filter(
    (feed) =>
      !hiddenMoments.find(
        (moment) =>
          moment.tokenContract.toLowerCase() ===
            feed.collection.toLowerCase() &&
          String(moment.tokenId) === String(feed.tokenId)
      )
  );
}
