import { Token } from "@/types/token";
import { TimelineMoment } from "@/hooks/useTimelineApi";
import { CHAIN } from "@/lib/consts";

// Maps a TimelineMoment to a Token for spiral/feed compatibility
export function mapMomentToToken(moment: TimelineMoment): Token {
  return {
    uri: moment.uri,
    creator: moment.admin,
    tokenId: moment.tokenId,
    collection: moment.address,
    released_at: Date.parse(moment.createdAt) || 0,
    chain: CHAIN.name,
    chainId: moment.chainId,
    created_at: Date.parse(moment.createdAt) || 0,
    username: moment.username,
  };
}

// Maps an array of TimelineMoment to Token[]
export function mapMomentsToTokens(moments: TimelineMoment[]): Token[] {
  return moments.map(mapMomentToToken);
}
