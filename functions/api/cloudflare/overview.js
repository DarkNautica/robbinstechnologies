import { buildOverview, notConfiguredResponse, readCloudflareConfig } from "../../_cloudflare-dashboard.js";

export async function onRequestGet(context) {
  const config = readCloudflareConfig(context.env);

  if (!config.accountId || !config.token) {
    return Response.json(notConfiguredResponse(config));
  }

  try {
    return Response.json(await buildOverview(config));
  } catch (error) {
    return Response.json(
      {
        configured: true,
        ok: false,
        apiStatus: "Cloudflare request failed",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 502 }
    );
  }
}
