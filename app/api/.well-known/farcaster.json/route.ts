export async function GET() {
  const config = {
    accountAssociation: {
      header:
        "eyJmaWQiOjEwNDM3NzMsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhGREQ0MTY5ZjFBMUJmRjU3MjQ3NWQ5ZTg1MDgzYUE2MjY4ZjUyZkUxIn0",
      payload:
        "eyJkb21haW4iOiJpbi1wcm9jZXNzLWdpdC10ZWNoZW5nbWUtbXljLTE0NzUtZDIyYTAxLXN3ZWV0bWFudGVjaHMtcHJvamVjdHMudmVyY2VsLmFwcCJ9",
      signature:
        "MHg1YzlhZWVkZmE2ODdjZWU3MmUyMWIzNmFmYmY2Zjk2NDdhYzdjYzZlNDVkNjI0ZGRiM2U5ZTBkMjhiZTk1Njk1MDk5MjI2NDc5ZGI3OWUyODBlNjQ4ZmYyZDE3MzgwZjI4OTg4YTk0ODJmMjMwNzY5NWFiYjMzZDcxZjBhZjE0YjFi",
    },
    frame: {
      version: "1",
      name: "Example Frame",
      iconUrl:
        "https://in-process-git-techengme-myc-1475-d22a01-sweetmantechs-projects.vercel.app/icon.png",
      homeUrl:
        "https://in-process-git-techengme-myc-1475-d22a01-sweetmantechs-projects.vercel.app",
      imageUrl:
        "https://in-process-git-techengme-myc-1475-d22a01-sweetmantechs-projects.vercel.app/image.png",
      buttonTitle: "Check this out",
      splashImageUrl:
        "https://in-process-git-techengme-myc-1475-d22a01-sweetmantechs-projects.vercel.app/splash.png",
      splashBackgroundColor: "#eeccff",
      webhookUrl:
        "https://in-process-git-techengme-myc-1475-d22a01-sweetmantechs-projects.vercel.app/api/webhook",
    },
  };

  return Response.json(config);
}
