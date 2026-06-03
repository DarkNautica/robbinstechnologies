import { buildOverview, notConfiguredResponse, readCloudflareConfig } from "../../_cloudflare-dashboard.js";
import { readSession } from "../../_auth.js";

export async function onRequestGet(context) {
  const session = await readSession(context.request, context.env);
  if (!session) {
    return Response.json({ ok: false, message: "Authentication required." }, { status: 401 });
  }

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
