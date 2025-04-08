export async function GET() {
  const config = {
    accountAssociation: {
      header:
        "eyJmaWQiOjEwNDM3NzMsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhGREQ0MTY5ZjFBMUJmRjU3MjQ3NWQ5ZTg1MDgzYUE2MjY4ZjUyZkUxIn0",
      payload: "eyJkb21haW4iOiJpbnByb2Nlc3MubXljby53dGYifQ",
      signature:
        "MHhhYjhhNTI3NDYyNzg1ZTUxNjhhNTMzODZkNjNlYjdjMTcxMWNlYzViMWQ0MjRjNGNiOTgzNjc3ODBiNTg2MjFjMWExYjVlZDg3YWRkZDAxMWRmZDVjY2MyMGE1ZTE3MzBiY2Q3Y2Y5OGFkMGRkNjgyNmY0MDMxMjNjMWRkMDZiYTFj",
    },
    frame: {
      version: "1",
      name: "Example Frame",
      iconUrl: "https://inprocess.myco.wtf/icon.png",
      homeUrl: "https://inprocess.myco.wtf",
      imageUrl: "https://inprocess.myco.wtf/image.png",
      buttonTitle: "Check this out",
      splashImageUrl: "https://inprocess.myco.wtf/splash.png",
      splashBackgroundColor: "#eeccff",
      webhookUrl: "https://inprocess.myco.wtf/api/webhook",
    },
  };

  return Response.json(config);
}
