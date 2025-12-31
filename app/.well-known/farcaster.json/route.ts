// @ts-nocheck
import { SITE_ORIGINAL_URL } from "@/lib/consts";

export async function GET() {
  const URL = SITE_ORIGINAL_URL;

  return Response.json({
    accountAssociation: {
      header: process.env.FARCASTER_HEADER,
      payload: process.env.FARCASTER_PAYLOAD,
      signature: process.env.FARCASTER_SIGNATURE,
    },
    frame: {
      version: process.env.NEXT_PUBLIC_VERSION,
      name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
      homeUrl: SITE_ORIGINAL_URL,
      iconUrl: process.env.NEXT_PUBLIC_ICON_URL,
      imageUrl: process.env.NEXT_PUBLIC_IMAGE_URL,
      buttonTitle: `Launch ${process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME}`,
      splashImageUrl: process.env.NEXT_PUBLIC_SPLASH_IMAGE_URL,
      splashBackgroundColor: `#${process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR}`,
      webhookUrl: `${URL}/api/webhook`,
      subtitle: "Artists own their timeline",
      description:
        "A living archive where artists document their creative process onchain. Own your evolution, not just your art. Every sketch, verse, sound is permanent.",
      primaryCategory: "art-creativity",
    },
    baseBuilder: {
      allowedAddresses: ["0x72A31A5A9568CD9EC1814C9B68dF0059317Bff87"],
    },
  });
}
