import { determineMediaType, getIPFSUrl } from "@/lib/zora/utils";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const createFetchTokenDataQuery = (
  collectionAddress: string,
  network: string,
  chain: string,
  limit: number
) => `
  query TokenIdQuery(
    $chainId: Int!
    $collectionAddress: String!
    $tokenId: String!
  ) {
    collectionOrToken(
      chainId: 8453,
      collectionAddress: "0x1590252D59F9DB3af56860b864CB49C97eF35ba9",
      tokenId: "1"
    ) {
      __typename
      ...CollectionPanel_collectionOrToken
      ...PostMedia_post
      id
    }
  }
`;

export const fetchTokenData = async (
  API_ENDPOINT: string,
  IPFS_GATEWAY: string,
  collectionAddress: string,
  network: string,
  chain: string,
  limit: number,
  after: string | null,
  retries = 3,
  initialDelay = 1000
) => {
  const query = createFetchTokenDataQuery(
    collectionAddress,
    network,
    chain,
    limit
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const executeRequest = async (delay: number): Promise<any> => {
    await wait(delay); // Wait before making the request

    try {
      const results = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "bvGOq2v_wSQ_a0ME1h65Fw",
        },
        body: JSON.stringify({ query, variables: { after } }),
      });

      if (results.status === 429) {
        const retryAfter = results.headers.get("Retry-After");
        const retryDelay = retryAfter ? parseInt(retryAfter) * 1000 : delay * 2;

        if (retries > 0) {
          console.error(`Rate limited. Retrying in ${retryDelay}ms...`);
          return executeRequest(retryDelay);
        } else {
          throw new Error("Rate limit exceeded. Max retries reached.");
        }
      }

      if (!results.ok) {
        throw new Error(`HTTP error! status: ${results.status}`);
      }

      const allData = await results.json();

      if (allData.errors) {
        throw new Error(allData.errors[0].message);
      }

      if (!allData.data || !allData.data.tokens || !allData.data.tokens.nodes) {
        throw new Error("Unexpected API response structure");
      }

      return allData;
    } catch (error) {
      if (retries > 0) {
        console.log(`Error occurred. Retrying in ${delay}ms...`);
        return executeRequest(delay * 2);
      } else {
        throw error;
      }
    }
  };

  try {
    const allData = await executeRequest(initialDelay);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tokens = allData.data.tokens.nodes.map((node: any) => {
      const token = node.token;
      const metadata = token.metadata;
      const mediaType = determineMediaType(metadata.content.mime);
      const mediaURL = getIPFSUrl(metadata.content.uri, IPFS_GATEWAY);
      const imageURL =
        mediaType === "audio" ? getIPFSUrl(metadata.image, IPFS_GATEWAY) : null;

      const comments = allData.data.mintComments.comments
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((comment: any) => comment.tokenId === token.tokenId)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((comment: any) => ({
          fromAddress: comment.fromAddress,
          comment: comment.comment,
          quantity: comment.quantity,
          blockNumber: comment.transactionInfo.blockNumber,
          blockTimestamp: comment.transactionInfo.blockTimestamp,
          transactionHash: comment.transactionInfo.transactionHash,
        }));

      return {
        tokenId: token.tokenId,
        mediaType,
        mediaURL,
        comments,
        imageURL,
        metadata,
        blockNumber: token.mintInfo.mintContext.blockNumber,
        blockTimestamp: token.mintInfo.mintContext.blockTimestamp,
        transactionHash: token.mintInfo.mintContext.transactionHash,
        originatorAddress: token.mintInfo.originatorAddress,
        toAddress: token.mintInfo.toAddress,
      };
    });

    return {
      tokens,
      pageInfo: allData.data.tokens.pageInfo,
    };
  } catch (error) {
    console.error("Error in fetchTokenData:", error);
    throw error;
  }
};
