const COOKIE_NAME = "mc_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

function base64UrlEncode(value) {
  const bytes = typeof value === "string" ? new TextEncoder().encode(value) : new Uint8Array(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(value) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function signPayload(payload, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return base64UrlEncode(signature);
}

function parseCookies(request) {
  return Object.fromEntries(
    (request.headers.get("Cookie") || "")
      .split(";")
      .map((cookie) => cookie.trim())
      .filter(Boolean)
      .map((cookie) => {
        const index = cookie.indexOf("=");
        return [cookie.slice(0, index), decodeURIComponent(cookie.slice(index + 1))];
      })
  );
}

function sessionSecret(env) {
  return env.AUTH_SESSION_SECRET || env.CLOUDFLARE_API_TOKEN || "local-session-secret";
}

export async function createSessionCookie(env, user) {
  const payload = base64UrlEncode(JSON.stringify({
    sub: user,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  }));
  const signature = await signPayload(payload, sessionSecret(env));
  return `${COOKIE_NAME}=${payload}.${signature}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${SESSION_TTL_SECONDS}`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;
}

export async function readSession(request, env) {
  const token = parseCookies(request)[COOKIE_NAME];
  if (!token || !token.includes(".")) return null;

  const [payload, signature] = token.split(".");
  const expected = await signPayload(payload, sessionSecret(env));
  if (signature !== expected) return null;

  try {
    const session = JSON.parse(base64UrlDecode(payload));
    if (!session.exp || session.exp < Math.floor(Date.now() / 1000)) return null;
    return {
      user: session.sub || env.AUTH_USERNAME || "operator",
      expiresAt: session.exp
    };
  } catch {
    return null;
  }
}

export async function requireSession(context) {
  const session = await readSession(context.request, context.env);
  if (session) return session;
  return null;
}

export function authUser(env) {
  return env.AUTH_USERNAME || "operator";
}

export function authPassword(env) {
  return env.AUTH_PASSWORD || "";
}
