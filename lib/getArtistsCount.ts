import { Collection } from "@/types/token";

const getArtistsCounts = (feeds: Collection[]) => {
  const todayEpochTime = Date.now();
  const filtred = feeds.filter(
    (feed: Collection) =>
      new Date(feed.released_at).getTime() <= todayEpochTime &&
      new Date(feed.released_at).getTime() >=
        todayEpochTime - 24 * 60 * 60 * 1000,
  );
  const creatorCounts = filtred.reduce(
    (acc, feed) => {
      acc[feed.creator] = (acc[feed.creator] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return Object.keys(creatorCounts).length;
};

export default getArtistsCounts;
