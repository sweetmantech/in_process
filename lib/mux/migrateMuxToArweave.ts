import { Address } from "viem";
import { downloadVideoFromMux } from "@/lib/mux/downloadVideoFromMux";
import { deleteMuxAsset } from "@/lib/mux/deleteMuxAsset";
import { findMuxAssetIdFromPlaybackUrl } from "@/lib/mux/findMuxAssetIdFromPlaybackUrl";
import { fetchTokenMetadata } from "@/lib/protocolSdk/ipfs/token-metadata";
import getMomentOnChainInfo from "@/lib/viem/getTokenInfo";
import getUpdateTokenURICall from "@/lib/viem/getUpdateTokenURICall";
import getUpdateContractMetadataCall from "@/lib/viem/getUpdateContractMetadataCall";
import { CHAIN_ID, IS_TESTNET } from "@/lib/consts";
import { uploadJson } from "../arweave/uploadJson";
import clientUploadToArweave from "../arweave/clientUploadToArweave";
import { getOrCreateSmartWallet } from "../coinbase/getOrCreateSmartWallet";
import { sendUserOperation } from "../coinbase/sendUserOperation";
import { updateTokenContractURI } from "../supabase/in_process_tokens/updateTokenContractURI";

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
 * 1. Gets token info using viem and fetches metadata from IPFS
 * 2. Extracts download URL from content.uri
 * 3. Downloads video from MUX
 * 4. Uploads video to Arweave
 * 5. Updates token metadata object with Arweave URI
 * 6. Uploads updated metadata JSON to Arweave
 * 7. Updates on-chain token URI and contract metadata
 * 8. Updates in_process_tokens table with new metadata URI
 * 9. Deletes video from MUX
 */
export async function migrateMuxToArweave({
  tokenContractAddress,
  tokenId,
  artistAddress,
}: MigrateMuxToArweaveInput): Promise<MigrateMuxToArweaveResult> {
  try {
    // Step 1: Get token info using viem and fetch metadata from IPFS
    const tokenInfo = await getMomentOnChainInfo({
      collectionAddress: tokenContractAddress,
      tokenId,
      chainId: CHAIN_ID,
    });

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
    const arweaveUri = await clientUploadToArweave(videoFile);

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

    // Step 7: Update on-chain token URI and contract metadata
    const smartAccount = await getOrCreateSmartWallet({
      address: artistAddress,
    });

    const updateTokenURICall = getUpdateTokenURICall(tokenContractAddress, tokenId, newMetadataUri);
    const updateContractURICall = getUpdateContractMetadataCall(
      tokenContractAddress,
      newMetadataUri,
      currentMetadata.name
    );

    const transaction = await sendUserOperation({
      smartAccount,
      network: IS_TESTNET ? "base-sepolia" : "base",
      calls: [updateContractURICall, updateTokenURICall],
    });

    // Step 8: Update in_process_tokens table with new metadata URI
    if (transaction && transaction.transactionHash) {
      try {
        await updateTokenContractURI({
          tokenContractAddress,
          tokenId: 0,
          chainId: CHAIN_ID,
          uri: newMetadataUri,
        });
      } catch (dbError) {
        // Log error but don't fail the migration if database update fails
        console.error(`Failed to update in_process_tokens:`, dbError);
      }

      // Step 9: Delete video from MUX
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
      transactionHash: transaction.transactionHash,
    };
  } catch (error: any) {
    throw new Error(`Failed to migrate MUX to Arweave: ${error?.message || "Unknown error"}`);
  }
}
