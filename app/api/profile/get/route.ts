import getStackClient from "@/lib/stack/getStackClient";
// import getTag from "@/lib/stack/getTag";

export async function GET() {
  try {
    const stackClient = getStackClient();
    const response = await stackClient.getLeaderboard();
    // const users: any = response.leaderboard;
    // const promise = users.map(async (user: any) => {
    //   const profile = await getTag(user.address, "profile");
    //   return {
    //     address: user.address,
    //     profile: profile?.length ? profile : null,
    //   };
    // });
    // const profiles = await Promise.all(promise);
    return Response.json(response);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to all profiles";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
