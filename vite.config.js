import react from "@vitejs/plugin-react";
import { createHmac } from "node:crypto";
import { defineConfig, loadEnv } from "vite";

const CLOUDFLARE_API_BASE = "https://api.cloudflare.com/client/v4";

function readCloudflareConfig(env) {
  return {
    accountId: env.CLOUDFLARE_ACCOUNT_ID || env.VITE_CLOUDFLARE_ACCOUNT_ID || "",
    token: env.CLOUDFLARE_API_TOKEN || ""
  };
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

function readAuthConfig(env) {
  return {
    username: env.AUTH_USERNAME || "operator",
    password: env.AUTH_PASSWORD || "",
    secret: env.AUTH_SESSION_SECRET || env.CLOUDFLARE_API_TOKEN || "local-session-secret"
  };
}

function parseCookies(req) {
  return Object.fromEntries(
    (req.headers.cookie || "")
      .split(";")
      .map((cookie) => cookie.trim())
      .filter(Boolean)
      .map((cookie) => {
        const index = cookie.indexOf("=");
        return [cookie.slice(0, index), decodeURIComponent(cookie.slice(index + 1))];
      })
  );
}

function signLocal(payload, secret) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function makeLocalSession(env, user) {
  const config = readAuthConfig(env);
  const payload = Buffer.from(JSON.stringify({
    sub: user,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
  })).toString("base64url");
  return `${payload}.${signLocal(payload, config.secret)}`;
}

function readLocalSession(req, env) {
  const token = parseCookies(req).mc_session;
  if (!token || !token.includes(".")) return null;
  const [payload, signature] = token.split(".");
  const config = readAuthConfig(env);
  if (signature !== signLocal(payload, config.secret)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!session.exp || session.exp < Math.floor(Date.now() / 1000)) return null;
    return { user: session.sub || config.username, expiresAt: session.exp };
  } catch {
    return null;
  }
}

function readJsonBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        resolve({});
      }
    });
    req.on("error", () => resolve({}));
  });
}

async function handleAuthRequest(req, res, next, env) {
  const url = new URL(req.url || "/", "http://localhost");
  if (!url.pathname.startsWith("/api/auth")) {
    next();
    return;
  }

  const config = readAuthConfig(env);

  if (url.pathname === "/api/auth/me" && req.method === "GET") {
    const session = readLocalSession(req, env);
    if (!session) {
      sendJson(res, 200, { authenticated: false });
      return;
    }
    sendJson(res, 200, { authenticated: true, user: session.user, expiresAt: session.expiresAt });
    return;
  }

  if (url.pathname === "/api/auth/login" && req.method === "POST") {
    const body = await readJsonBody(req);
    const username = String(body.username || "").trim();
    const password = String(body.password || "");
    if (!config.password) {
      sendJson(res, 503, { ok: false, message: "AUTH_PASSWORD is not configured." });
      return;
    }
    if (username !== config.username || password !== config.password) {
      sendJson(res, 401, { ok: false, message: "Invalid credentials." });
      return;
    }
    res.setHeader("Set-Cookie", `mc_session=${makeLocalSession(env, config.username)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${60 * 60 * 24 * 7}`);
    sendJson(res, 200, { ok: true, user: config.username });
    return;
  }

  if (url.pathname === "/api/auth/logout" && req.method === "POST") {
    res.setHeader("Set-Cookie", "mc_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0");
    sendJson(res, 200, { ok: true });
    return;
  }

  sendJson(res, 404, { ok: false, message: "Unknown auth endpoint." });
}

function maskAccountId(accountId) {
  if (!accountId) return "";
  return `${accountId.slice(0, 6)}...${accountId.slice(-4)}`;
}

async function cloudflareFetch(path, config, query = {}) {
  const url = new URL(`${CLOUDFLARE_API_BASE}${path}`);
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json"
    }
  });
  const body = await response.json().catch(() => ({}));

  return {
    ok: response.ok && body.success !== false,
    status: response.status,
    body
  };
}

function trendFromCount(count, offset = 0) {
  return Array.from({ length: 16 }, (_, index) => {
    const wave = Math.round(Math.sin((index + offset) / 2) * 4);
    return Math.max(6, 18 + count + wave + ((index * 5 + offset) % 9));
  });
}

function formatSince(value) {
  if (!value) return "n/a";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "n/a";
  const seconds = Math.max(1, Math.round((Date.now() - date.getTime()) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

function normalizeDnsRecord(record) {
  return {
    id: record.id,
    type: record.type,
    name: record.name,
    content: record.content,
    proxied: Boolean(record.proxied),
    proxiable: Boolean(record.proxiable),
    ttl: record.ttl,
    modifiedOn: record.modified_on || record.created_on || null
  };
}

function publicZone(zone) {
  return {
    id: zone.id,
    name: zone.name,
    status: zone.status,
    paused: Boolean(zone.paused),
    type: zone.type,
    plan: zone.plan?.name || "Cloudflare",
    nameServers: zone.name_servers || [],
    createdOn: zone.created_on || null,
    modifiedOn: zone.modified_on || null,
    activatedOn: zone.activated_on || null,
    developmentMode: Number(zone.development_mode || 0)
  };
}

async function readOptional(path, config, query = {}) {
  try {
    return await cloudflareFetch(path, config, query);
  } catch (error) {
    return {
      ok: false,
      status: 0,
      body: {
        errors: [{ message: error instanceof Error ? error.message : "Request failed" }]
      }
    };
  }
}

async function probeSite(hostname) {
  const url = `https://${hostname}`;

  for (const method of ["HEAD", "GET"]) {
    const startedAt = Date.now();
    try {
      const response = await fetch(url, {
        method,
        redirect: "follow",
        signal: AbortSignal.timeout(4500),
        headers: {
          "User-Agent": "Master-Control-Dashboard/0.1"
        }
      });

      return {
        ok: response.status < 500,
        statusCode: response.status,
        responseMs: Date.now() - startedAt,
        checkedAt: new Date().toISOString()
      };
    } catch (error) {
      if (method === "GET") {
        return {
          ok: false,
          statusCode: null,
          responseMs: null,
          checkedAt: new Date().toISOString(),
          error: error instanceof Error ? error.message : "Probe failed"
        };
      }
    }
  }

  return {
    ok: false,
    statusCode: null,
    responseMs: null,
    checkedAt: new Date().toISOString()
  };
}

function certificateStatus(sslVerification) {
  if (!sslVerification.ok) return "unknown";
  const records = Array.isArray(sslVerification.body.result) ? sslVerification.body.result : [];
  if (!records.length) return "unknown";
  if (records.some((record) => record.certificate_status === "expired")) return "expired";
  if (records.some((record) => record.certificate_status !== "active")) return records[0].certificate_status || "pending";
  return "active";
}

async function enrichZone(zone, config, index) {
  const base = publicZone(zone);
  const [dnsResult, sslResult, universalSslResult, sslVerificationResult, probe] = await Promise.all([
    readOptional(`/zones/${zone.id}/dns_records`, config, { per_page: "100", order: "type" }),
    readOptional(`/zones/${zone.id}/settings/ssl`, config),
    readOptional(`/zones/${zone.id}/ssl/universal/settings`, config),
    readOptional(`/zones/${zone.id}/ssl/verification`, config),
    probeSite(zone.name)
  ]);

  const dnsRecords = Array.isArray(dnsResult.body.result)
    ? dnsResult.body.result.map(normalizeDnsRecord)
    : [];
  const proxiedRecords = dnsRecords.filter((record) => record.proxied);
  const sslMode = sslResult.body.result?.value || "unknown";
  const universalSsl = universalSslResult.body.result?.enabled;
  const sslStatus = certificateStatus(sslVerificationResult);

  const zoneHealthy = base.status === "active" && !base.paused;
  const siteStatus = !zoneHealthy
    ? "degraded"
    : probe.ok
      ? "up"
      : "down";

  return {
    ...base,
    dnsRecords,
    dnsCount: dnsRecords.length,
    proxiedCount: proxiedRecords.length,
    sslMode,
    universalSsl: universalSsl === undefined ? "unknown" : Boolean(universalSsl),
    sslStatus,
    probe,
    permissions: {
      dns: dnsResult.ok,
      sslMode: sslResult.ok,
      universalSsl: universalSslResult.ok,
      sslVerification: sslVerificationResult.ok
    },
    site: {
      id: zone.id,
      name: zone.name,
      domain: zone.name,
      url: `https://${zone.name}`,
      status: siteStatus,
      uptime: siteStatus === "up" ? 100 : siteStatus === "degraded" ? 50 : 0,
      response: probe.responseMs,
      location: base.type?.toUpperCase() || "ZONE",
      flag: base.status || "zone",
      lastCheck: formatSince(probe.checkedAt),
      requests: `${dnsRecords.length} DNS`,
      statusCode: probe.statusCode,
      dnsCount: dnsRecords.length,
      proxiedCount: proxiedRecords.length,
      sslMode,
      sslStatus,
      trend: trendFromCount(Math.max(1, dnsRecords.length), index)
    }
  };
}

function buildCloudflareMetrics({ verify, zones, workers }) {
  const zoneCount = zones.length;
  const activeZones = zones.filter((zone) => zone.status === "active").length;
  const pausedZones = zones.filter((zone) => zone.paused).length;
  const workerCount = Array.isArray(workers) ? workers.length : null;
  const dnsCount = zones.reduce((sum, zone) => sum + (zone.dnsCount || 0), 0);
  const proxiedCount = zones.reduce((sum, zone) => sum + (zone.proxiedCount || 0), 0);

  return [
    {
      label: "Status",
      value: verify.ok ? "Active" : "Error",
      tone: verify.ok ? "good" : "danger",
      trend: trendFromCount(12)
    },
    {
      label: "DNS records",
      value: String(dnsCount),
      tone: "good",
      trend: trendFromCount(dnsCount, 1)
    },
    {
      label: "Proxied records",
      value: String(proxiedCount),
      tone: proxiedCount ? "good" : "warn",
      trend: trendFromCount(proxiedCount, 2)
    },
    {
      label: "Active zones",
      value: `${activeZones}/${zoneCount}`,
      tone: activeZones === zoneCount ? "good" : "warn",
      trend: trendFromCount(activeZones, 3)
    },
    {
      label: "Workers",
      value: workerCount === null ? "n/a" : String(workerCount),
      tone: workerCount === null ? "warn" : "good",
      trend: trendFromCount(workerCount || 1, 4)
    }
  ];
}

function buildAlerts({ verify, zones, permissions }) {
  const alerts = [];
  const push = (level, title, detail, time = "now") => {
    alerts.push({
      id: `${level}-${alerts.length}-${title}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      level,
      title,
      detail,
      time
    });
  };

  if (!verify.ok) {
    push("critical", "Cloudflare API token failed verification", "Check CLOUDFLARE_API_TOKEN in .env.local.");
  }

  Object.entries(permissions).forEach(([key, allowed]) => {
    if (!allowed) {
      push("warning", `Missing ${key} API permission`, "Some dashboard data is unavailable for this token.");
    }
  });

  zones.forEach((zone) => {
    if (zone.paused) push("warning", `${zone.name} is paused`, "Cloudflare proxying is paused for this zone.");
    if (zone.status !== "active") push("warning", `${zone.name} is ${zone.status}`, "Zone is not fully active in Cloudflare.");
    if (zone.site.status === "down") push("critical", `${zone.name} did not respond`, zone.probe.error || "Live HTTPS probe failed.");
    if (zone.site.status === "degraded") push("warning", `${zone.name} needs attention`, "Zone status or probe result is degraded.");
    if (zone.sslMode === "off" || zone.sslMode === "flexible") push("warning", `${zone.name} SSL mode is ${zone.sslMode}`, "Consider Full or Full Strict when your origin supports it.");
    if (zone.universalSsl === false) push("critical", `${zone.name} Universal SSL is disabled`, "Visitors may lose HTTPS coverage.");
    if (zone.sslStatus === "expired") push("critical", `${zone.name} has expired SSL verification`, "Cloudflare SSL verification reports an expired certificate.");
    if (zone.permissions.dns && zone.dnsCount === 0) push("warning", `${zone.name} has no DNS records`, "Cloudflare returned zero DNS records for this zone.");
  });

  return alerts;
}

function buildIncidents(alerts) {
  return alerts.slice(0, 4).map((alert) => ({
    id: `incident-${alert.id}`,
    title: alert.title,
    detail: alert.detail,
    time: alert.time,
    status: alert.level === "critical" ? "down" : alert.level === "warning" ? "degraded" : "up"
  }));
}

function buildSummary({ zones, workers }) {
  const dnsByZone = zones.map((zone) => zone.dnsCount || 0);
  const responseByZone = zones.map((zone) => zone.site.response).filter((value) => typeof value === "number");
  const totalDns = dnsByZone.reduce((sum, value) => sum + value, 0);
  const proxiedRecords = zones.reduce((sum, zone) => sum + (zone.proxiedCount || 0), 0);
  const avgResponse = responseByZone.length
    ? Math.round(responseByZone.reduce((sum, value) => sum + value, 0) / responseByZone.length)
    : null;

  return {
    dns: {
      value: totalDns,
      label: "DNS records",
      detail: `${proxiedRecords} proxied`,
      series: dnsByZone.length ? dnsByZone : [0]
    },
    response: {
      value: avgResponse,
      label: "Avg. live response",
      detail: `${responseByZone.length}/${zones.length} zones reachable`,
      series: responseByZone.length ? responseByZone : [0]
    },
    workers: {
      value: Array.isArray(workers) ? workers.length : null,
      label: "Workers services"
    }
  };
}

async function buildOverview(config) {
  const verify = await cloudflareFetch(`/accounts/${config.accountId}/tokens/verify`, config);
  const [accountResult, zonesResult, workersResult] = await Promise.all([
    cloudflareFetch(`/accounts/${config.accountId}`, config),
    cloudflareFetch("/zones", config, { "account.id": config.accountId, per_page: "50" }),
    cloudflareFetch(`/accounts/${config.accountId}/workers/services`, config, { per_page: "50" })
  ]);

  const workers = Array.isArray(workersResult.body.result) ? workersResult.body.result : null;
  const rawZones = Array.isArray(zonesResult.body.result) ? zonesResult.body.result : [];
  const zones = await Promise.all(rawZones.map((zone, index) => enrichZone(zone, config, index)));
  const permissions = {
    account: accountResult.ok,
    zones: zonesResult.ok,
    workers: workersResult.ok,
    dns: zones.every((zone) => zone.permissions.dns),
    ssl: zones.every((zone) => zone.permissions.sslMode || zone.permissions.universalSsl || zone.permissions.sslVerification)
  };
  const alerts = buildAlerts({ verify, zones, permissions });

  return {
    configured: true,
    ok: verify.ok,
    accountId: maskAccountId(config.accountId),
    accountName: accountResult.body.result?.name || "Cloudflare account",
    tokenStatus: verify.body.result?.status || (verify.ok ? "active" : "error"),
    apiStatus: verify.ok ? "OK" : `Error ${verify.status}`,
    zones,
    sites: zones.map((zone) => zone.site),
    alerts,
    incidents: buildIncidents(alerts),
    summary: buildSummary({ zones, workers }),
    metrics: buildCloudflareMetrics({ verify, zones, workers }),
    permissions,
    checkedAt: new Date().toISOString()
  };
}

async function handleCloudflareRequest(req, res, next, env) {
  const url = new URL(req.url || "/", "http://localhost");
  if (!url.pathname.startsWith("/api/cloudflare")) {
    next();
    return;
  }

  if (!readLocalSession(req, env)) {
    sendJson(res, 401, { ok: false, message: "Authentication required." });
    return;
  }

  const config = readCloudflareConfig(env);
  if (!config.accountId || !config.token) {
    sendJson(res, 200, {
      configured: false,
      ok: false,
      accountId: maskAccountId(config.accountId),
      apiStatus: !config.accountId ? "Account ID missing" : "Token needed",
      message: "Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN in .env.local, then restart the dev server."
    });
    return;
  }

  try {
    if (url.pathname === "/api/cloudflare/verify") {
      const verify = await cloudflareFetch(`/accounts/${config.accountId}/tokens/verify`, config);
      sendJson(res, verify.ok ? 200 : 401, {
        configured: true,
        ok: verify.ok,
        accountId: maskAccountId(config.accountId),
        tokenStatus: verify.body.result?.status || (verify.ok ? "active" : "error"),
        result: verify.body.result || null,
        errors: verify.body.errors || []
      });
      return;
    }

    if (url.pathname === "/api/cloudflare/zones") {
      const zonesResult = await cloudflareFetch("/zones", config, { "account.id": config.accountId, per_page: "50" });
      const zones = Array.isArray(zonesResult.body.result) ? zonesResult.body.result.map(publicZone) : [];
      sendJson(res, zonesResult.ok ? 200 : 502, {
        configured: true,
        ok: zonesResult.ok,
        accountId: maskAccountId(config.accountId),
        zones,
        errors: zonesResult.body.errors || []
      });
      return;
    }

    if (url.pathname === "/api/cloudflare/overview") {
      sendJson(res, 200, await buildOverview(config));
      return;
    }

    sendJson(res, 404, { ok: false, message: "Unknown Cloudflare dashboard endpoint." });
  } catch (error) {
    sendJson(res, 502, {
      configured: true,
      ok: false,
      accountId: maskAccountId(config.accountId),
      apiStatus: "Cloudflare request failed",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
}

function cloudflareApiPlugin(env) {
  return {
    name: "master-control-cloudflare-api",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        handleAuthRequest(req, res, next, env);
      });
      server.middlewares.use((req, res, next) => {
        handleCloudflareRequest(req, res, next, env);
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        handleAuthRequest(req, res, next, env);
      });
      server.middlewares.use((req, res, next) => {
        handleCloudflareRequest(req, res, next, env);
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), cloudflareApiPlugin(env)]
  };
});
