import { Address } from "viem";
import { downloadVideoFromMux } from "@/lib/mux/downloadVideoFromMux";
import { deleteMuxAsset } from "@/lib/mux/deleteMuxAsset";
import { findMuxAssetIdFromPlaybackUrl } from "@/lib/mux/findMuxAssetIdFromPlaybackUrl";
import uploadToArweave from "@/lib/arweave/uploadToArweave";
import { updateMomentURI } from "@/lib/moment/updateMomentURI";
import { fetchTokenMetadata } from "@/lib/protocolSdk/ipfs/token-metadata";
import getTokenInfo from "@/lib/viem/getTokenInfo";
import { CHAIN_ID } from "@/lib/consts";
import { uploadJson } from "../arweave/uploadJson";

export interface MigrateMuxToArweaveInput {
  tokenContractAddress: Address;
  tokenId: string;
  artistAddress: Address;
}

export interface MigrateMuxToArweaveResult {
  success: boolean;
  arweaveUri: string;
  transactionHash: string;
}

/**
 * Migrates a video from MUX to Arweave:
 * 1. Gets token metadata using viem
 * 2. Extracts download URL from content.uri
 * 3. Downloads video from MUX
 * 4. Uploads to Arweave
 * 5. Updates token metadata with Arweave URI
 * 6. Deletes video from MUX
 */
export async function migrateMuxToArweave({
  tokenContractAddress,
  tokenId,
  artistAddress,
}: MigrateMuxToArweaveInput): Promise<MigrateMuxToArweaveResult> {
  try {
    // Step 1: Get current token metadata using viem
    const tokenInfo = await getTokenInfo(tokenContractAddress, tokenId, CHAIN_ID);
    const currentMetadata = await fetchTokenMetadata(tokenInfo.tokenUri);

    if (!currentMetadata) {
      throw new Error("Failed to fetch current token metadata");
    }

    // Step 2: Extract download URL from content.uri (should be MUX download URL)
    const downloadUrl = currentMetadata.content?.uri;
    if (!downloadUrl) {
      throw new Error("Token metadata does not have a content URI");
    }

    // Check if it's a MUX URL (download URL or playback URL)
    const isMuxUrl = downloadUrl.includes("mux.com") || downloadUrl.includes("stream.mux.com");
    if (!isMuxUrl) {
      throw new Error("Content URI is not a MUX URL - migration not needed");
    }

    // Step 3: Download video from MUX
    const videoFile = await downloadVideoFromMux(downloadUrl);

    // Step 4: Upload video to Arweave
    const arweaveUri = await uploadToArweave(videoFile);

    if (!arweaveUri) {
      throw new Error("Failed to upload video to Arweave");
    }

    // Step 5: Update metadata with Arweave URI (replace MUX URLs)
    // Preserve existing mime type or default to video/mp4
    const mimeType = currentMetadata.content?.mime || videoFile.type || "video/mp4";

    const updatedMetadata = {
      ...currentMetadata,
      animation_url: arweaveUri,
      content: {
        mime: mimeType,
        uri: arweaveUri,
      },
    };

    // Step 6: Upload updated metadata JSON to Arweave
    const newMetadataUri = await uploadJson(updatedMetadata);

    // Step 7: Update token URI on-chain
    const updateResult = await updateMomentURI({
      tokenContractAddress,
      tokenId,
      newUri: newMetadataUri,
      artistAddress,
    });

    // Step 8: Delete video from MUX only after on-chain update is confirmed successful
    if (updateResult && updateResult.hash) {
      const playbackUrl = currentMetadata.animation_url;
      if (playbackUrl && playbackUrl.includes("stream.mux.com")) {
        try {
          const assetId = await findMuxAssetIdFromPlaybackUrl(playbackUrl);
          if (assetId) {
            await deleteMuxAsset(assetId);
          }
        } catch (deleteError) {
          // Log error but don't fail the migration if deletion fails
          console.error(`Failed to delete MUX asset:`, deleteError);
        }
      }
    }

    return {
      success: true,
      arweaveUri,
      transactionHash: updateResult.hash,
    };
  } catch (error: any) {
    throw new Error(`Failed to migrate MUX to Arweave: ${error?.message || "Unknown error"}`);
  }
}
