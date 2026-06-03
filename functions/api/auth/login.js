import { authPassword, authUser, createSessionCookie } from "../../_auth.js";

export async function onRequestPost(context) {
  const body = await context.request.json().catch(() => ({}));
  const username = String(body.username || "").trim();
  const password = String(body.password || "");
  const expectedUser = authUser(context.env);
  const expectedPassword = authPassword(context.env);

  if (!expectedPassword) {
    return Response.json({ ok: false, message: "AUTH_PASSWORD is not configured." }, { status: 503 });
  }

  if (username !== expectedUser || password !== expectedPassword) {
    return Response.json({ ok: false, message: "Invalid credentials." }, { status: 401 });
  }

  return Response.json(
    { ok: true, user: expectedUser },
    { headers: { "Set-Cookie": await createSessionCookie(context.env, expectedUser) } }
  );
}
