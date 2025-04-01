export async function GET() {
  return Response.json({
    version: "next",
    imageUrl: "https://inprocess.myco.wtf/desktop_footer_logo.png",
    aspectRatio: "3:2",
    button: {
      title: "In Process",
      action: {
        type: "launch_frame",
        name: "In Process",
        url: "https://inprocess.myco.wtf",
        splashImageUrl: "https://inprocess.myco.wtf/desktop_footer_logo.png",
      },
    },
  });
}
