import { readSession } from "../../_auth.js";

export async function onRequestGet(context) {
  const session = await readSession(context.request, context.env);
  if (!session) {
    return Response.json({ authenticated: false });
  }

  return Response.json({
    authenticated: true,
    user: session.user,
    expiresAt: session.expiresAt
  });
}
