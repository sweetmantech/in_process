import { Collection } from "@/types/token";

const getTodayPosts = (feeds: Collection[]) => {
  const todayEpochTime = Date.now();
  const filtred = feeds.filter(
    (feed: Collection) =>
      new Date(feed.released_at).getTime() <= todayEpochTime &&
      new Date(feed.released_at).getTime() >=
        todayEpochTime - 24 * 60 * 60 * 1000,
  );

  return filtred.length;
};

export default getTodayPosts;
