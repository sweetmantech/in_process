import { NextRequest } from "next/server";
import { getLinkPreview } from "link-preview-js";
import dns from "node:dns";
import getYoutubeDetail from "@/lib/getYoutubeDetail";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  try {
    if (!url) throw Error("url is invalid.");

    const youtubeDetail = await getYoutubeDetail(url as string);
    if (youtubeDetail) return Response.json(youtubeDetail);

    const data = await getLinkPreview(url, {
      followRedirects: `manual`,
      handleRedirects: (baseURL: string, forwardedURL: string) => {
        const urlObj = new URL(baseURL);
        const forwardedURLObj = new URL(forwardedURL);
        if (
          forwardedURLObj.hostname === urlObj.hostname ||
          forwardedURLObj.hostname === "www." + urlObj.hostname ||
          "www." + forwardedURLObj.hostname === urlObj.hostname
        ) {
          return true;
        } else {
          return false;
        }
      },
      resolveDNSHost: async (url: string) => {
        return new Promise((resolve, reject) => {
          const hostname = new URL(url).hostname;
          dns.lookup(hostname, (err, address) => {
            if (err) {
              reject(err);
              return;
            }

            resolve(address);
          });
        });
      },
    });
    return Response.json(data);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get Dune transactions";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
