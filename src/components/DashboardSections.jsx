import {
  Check,
  ExternalLink,
  Globe,
  MoreVertical,
  Search,
  Server,
  Shield,
  X
} from "lucide-react";
import { AreaChart, Sparkline } from "./Charts";
import { AlertGlyph, EmptyState, MetricBlock, Panel, SmallStat, StatusDot, StatusPill, TimeBadge } from "./Primitives";

function formatPercent(value) {
  if (typeof value !== "number") return "n/a";
  return `${value.toFixed(2)}%`;
}

function formatMs(value) {
  return typeof value === "number" ? `${value} ms` : "n/a";
}

function statusTone(status) {
  if (status === "up") return "good";
  if (status === "degraded" || status === "maintenance") return "warn";
  return "danger";
}

function liveHealthSegments(sites) {
  if (!sites.length) return Array(32).fill("maintenance");
  const source = sites.flatMap((site) => Array(8).fill(site.status));
  return Array.from({ length: 64 }, (_, index) => source[index % source.length]);
}

export function HealthOverview({ sites, overallUptime, incidentsCount, alertsCount }) {
  const counts = sites.reduce(
    (acc, site) => {
      acc[site.status] = (acc[site.status] || 0) + 1;
      return acc;
    },
    { up: 0, degraded: 0, down: 0, maintenance: 0 }
  );
  const responseSeries = sites.length ? sites.map((site) => site.response || 0) : [0, 0, 0];

  return (
    <Panel title="Health Overview" action="Live Cloudflare">
      <div className="metrics-grid">
        <MetricBlock value={sites.length} label="Sites" link="View all" />
        <MetricBlock value={sites.length ? formatPercent(overallUptime) : "n/a"} label="Live Health" link="View probes" spark={<Sparkline data={responseSeries} />} />
        <MetricBlock value={sites.length} label="Active Monitors" link="View monitors" />
        <MetricBlock value={incidentsCount} label="Major Incidents" link="View incidents" />
        <MetricBlock value={alertsCount} label="Active Alerts" link="View alerts" />
      </div>

      <div className="health-strip" aria-label="Live zone status sample">
        {liveHealthSegments(sites).map((status, index) => (
          <span key={`${status}-${index}`} className={`health-segment ${status}`} />
        ))}
      </div>

      <div className="health-legend">
        <SmallStat label="Operational" value={counts.up} tone="good" />
        <SmallStat label="Degraded" value={counts.degraded} tone="warn" />
        <SmallStat label="Down" value={counts.down} tone="danger" />
        <SmallStat label="Maintenance" value={counts.maintenance} tone="warn" />
        <strong>{sites.length ? `${formatPercent(overallUptime)} live health` : "Waiting for API"}</strong>
      </div>
    </Panel>
  );
}

export function MonitorTable({ sites, filter, onFilterChange, query, onQueryChange, onSelectSite, selectedSiteId }) {
  const statusCounts = sites.reduce(
    (acc, site) => {
      acc[site.status] = (acc[site.status] || 0) + 1;
      return acc;
    },
    { up: 0, degraded: 0, down: 0, maintenance: 0 }
  );

  const filteredSites = sites.filter((site) => {
    const matchesFilter = filter === "all" || site.status === filter;
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery = !normalizedQuery || [site.name, site.domain, site.url, site.status].some((field) => field.toLowerCase().includes(normalizedQuery));
    return matchesFilter && matchesQuery;
  });
  const visibleSites = filteredSites.slice(0, 5);

  const filters = [
    { id: "all", label: `All (${sites.length})` },
    { id: "up", label: `Up (${statusCounts.up})` },
    { id: "degraded", label: `Degraded (${statusCounts.degraded})` },
    { id: "down", label: `Down (${statusCounts.down})` }
  ];

  return (
    <Panel title="Live Site Monitors" action="View all">
      <div className="table-tools">
        <div className="segmented-control" role="tablist" aria-label="Monitor status filter">
          {filters.map((item) => (
            <button
              key={item.id}
              className={filter === item.id ? "active" : ""}
              type="button"
              onClick={() => onFilterChange(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <label className="inline-search">
          <Search size={16} strokeWidth={2} />
          <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search monitors..." />
        </label>
      </div>

      <div className="monitor-table-wrap">
        <table className="monitor-table">
          <thead>
            <tr>
              <th>Site</th>
              <th>URL</th>
              <th>Status</th>
              <th>Health</th>
              <th>Resp. Time</th>
              <th>Zone</th>
              <th>Last Check</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {visibleSites.map((site) => (
              <tr key={site.id} className={selectedSiteId === site.id ? "selected" : ""} onClick={() => onSelectSite(site.id)}>
                <td>
                  <span className="site-cell">
                    <Globe size={16} strokeWidth={2} />
                    {site.name}
                  </span>
                </td>
                <td className="muted-cell">{site.url}</td>
                <td><StatusPill status={site.status} /></td>
                <td>{formatPercent(site.uptime)}</td>
                <td className={site.response > 300 || site.response === null ? "danger-text" : ""}>{formatMs(site.response)}</td>
                <td>{site.location} <span className="flag-code">{site.flag}</span></td>
                <td>{site.lastCheck}</td>
                <td>
                  <button className="row-action" type="button" aria-label={`Open ${site.name} actions`}>
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredSites.length ? (
        <button className="panel-footer-action" type="button">View all monitors</button>
      ) : (
        <EmptyState title="No monitors loaded" detail="Cloudflare zones and local probes will appear here after the API responds." />
      )}
    </Panel>
  );
}

export function CloudflareOverview({ cloudflare }) {
  const isConfigured = cloudflare?.configured;
  const metrics = cloudflare?.metrics?.length
    ? cloudflare.metrics
    : [{ label: "Status", value: cloudflare?.apiStatus || "Checking", tone: "warn", trend: [1, 1, 1] }];
  const apiTone = cloudflare?.ok ? "up" : isConfigured ? "down" : "maintenance";
  const apiLabel = cloudflare?.apiStatus || "Checking";
  const accountLabel = cloudflare?.accountName || cloudflare?.accountId || "Add token in .env.local";

  return (
    <Panel title="Cloudflare Overview" action="Manage">
      <div className="cf-list">
        {metrics.map((metric) => (
          <div key={metric.label} className="cf-row">
            <div className={`cf-icon ${metric.tone}`}>
              {metric.label === "Status" ? <Check size={16} strokeWidth={2.5} /> : metric.label === "Workers" ? <Server size={16} strokeWidth={2.2} /> : <Shield size={16} strokeWidth={2.1} />}
            </div>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <Sparkline data={metric.trend} tone={metric.tone} />
          </div>
        ))}
      </div>
      <div className="cf-footer">
        <span>API Status <StatusDot status={apiTone} /> {apiLabel}</span>
        <span>Account {accountLabel}</span>
      </div>
      {!isConfigured ? (
        <div className="cf-note">
          <strong>Token needed</strong>
          <span>Put your API token in .env.local and restart the dev server.</span>
        </div>
      ) : null}
      <button className="panel-footer-action" type="button">
        Open Cloudflare Dashboard
        <ExternalLink size={14} strokeWidth={2.2} />
      </button>
    </Panel>
  );
}

export function AlertQueue({ alerts, cloudflare }) {
  return (
    <Panel title="Alert Queue" action="View all">
      {alerts.length ? (
        <div className="event-list">
          {alerts.map((alert) => (
            <article key={alert.id} className={`event-row ${alert.level}`}>
              <div className="event-icon"><AlertGlyph level={alert.level} /></div>
              <div>
                <strong>{alert.title}</strong>
                <span>{alert.detail}</span>
              </div>
              <time>{alert.time}</time>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          title={cloudflare?.ok ? "No live alerts" : "Cloudflare data unavailable"}
          detail={cloudflare?.ok ? "Token, zones, SSL, DNS, and live probes look clear." : cloudflare?.message || "Waiting for Cloudflare API data."}
        />
      )}
      <button className="panel-footer-action" type="button">{alerts.length ? "View all alerts" : "Refresh alerts"}</button>
    </Panel>
  );
}

export function RecentIncidents({ incidents }) {
  return (
    <Panel title="Recent Incidents" action="View all">
      {incidents.length ? (
        <div className="timeline">
          {incidents.map((incident) => (
            <article key={incident.id} className="timeline-row">
              <StatusDot status={incident.status} />
              <div>
                <strong>{incident.title}</strong>
                <span>{incident.detail}</span>
              </div>
              <time>{incident.time}</time>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title="No live incidents" detail="No zone, SSL, DNS, token, or probe incidents are active." />
      )}
      <button className="panel-footer-action" type="button">{incidents.length ? "View all incidents" : "Refresh incidents"}</button>
    </Panel>
  );
}

export function TrafficPanels({ summary }) {
  const dnsSeries = summary?.dns?.series?.length ? summary.dns.series : [0];
  const responseSeries = summary?.response?.series?.length ? summary.response.series : [0];
  const dnsValue = summary?.dns ? String(summary.dns.value) : "n/a";
  const responseValue = typeof summary?.response?.value === "number" ? `${summary.response.value} ms` : "n/a";

  return (
    <div className="chart-grid">
      <Panel title="DNS Inventory" action="Cloudflare API">
        <div className="chart-card-body">
          <div className="chart-stat">
            <strong>{dnsValue}</strong>
            <span>{summary?.dns?.label || "DNS records"}</span>
            <b>{summary?.dns?.detail || "Waiting"}</b>
            <small>across live zones</small>
          </div>
          <AreaChart data={dnsSeries} tone="good" label="DNS inventory" />
        </div>
      </Panel>
      <Panel title="Response Time" action="Live probes">
        <div className="chart-card-body">
          <div className="chart-stat">
            <strong>{responseValue}</strong>
            <span>{summary?.response?.label || "Avg. live response"}</span>
            <b>{summary?.response?.detail || "Waiting for probes"}</b>
            <small>HTTPS apex checks</small>
          </div>
          <AreaChart data={responseSeries} tone="good" label="Response time" />
        </div>
      </Panel>
    </div>
  );
}

export function SiteCards({ sites, selectedSiteId, onSelectSite }) {
  return (
    <Panel title="Sites" action="View all sites">
      {sites.length ? (
        <div className="site-card-row">
          {sites.slice(0, 7).map((site) => (
            <button
              key={site.id}
              className={`site-card ${selectedSiteId === site.id ? "active" : ""}`}
              type="button"
              onClick={() => onSelectSite(site.id)}
            >
              <div className="site-card-title">
                <Globe size={16} strokeWidth={2} />
                <strong>{site.name}</strong>
              </div>
              <span>{site.domain}</span>
              <StatusPill status={site.status} />
              <Sparkline data={site.trend} tone={statusTone(site.status)} />
              <div className="card-stat-row">
                <small><strong>{formatPercent(site.uptime)}</strong> Health</small>
                <small><strong className={site.response > 300 || site.response === null ? "danger-text" : ""}>{formatMs(site.response)}</strong> Response</small>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <EmptyState title="No sites loaded" detail="Cloudflare zones will become site monitors after the API responds." />
      )}
    </Panel>
  );
}

export function DomainRail({ cloudflare }) {
  const liveDomains = cloudflare?.zones?.length
    ? cloudflare.zones.slice(0, 4).map((zone) => ({
        name: zone.name,
        registrar: zone.plan || "Cloudflare",
        renews: zone.status === "active" ? "Active" : zone.status || "Zone",
        state: zone.paused ? "Paused" : "Protected"
      }))
    : [];

  return (
    <Panel title="Domains" action="View all">
      {liveDomains.length ? (
        <div className="domain-grid">
          {liveDomains.map((domain) => (
            <article key={domain.name} className="domain-card">
              <div>
                <strong>{domain.name}</strong>
                <span>{domain.registrar}</span>
              </div>
              <TimeBadge>{domain.renews}</TimeBadge>
              <b>{domain.state}</b>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title="No zones loaded" detail={cloudflare?.message || "Cloudflare zones will appear after the API responds."} />
      )}
    </Panel>
  );
}

export function AddSiteDrawer({ open, onClose, onSubmit, form, onFormChange }) {
  if (!open) return null;

  return (
    <div className="drawer-backdrop" role="presentation">
      <aside className="drawer" aria-label="Add site">
        <div className="drawer-header">
          <div>
            <h2>Add Site</h2>
            <span>New uptime monitor</span>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close add site">
            <X size={18} />
          </button>
        </div>
        <form className="drawer-form" onSubmit={onSubmit}>
          <label>
            Site name
            <input value={form.name} onChange={(event) => onFormChange("name", event.target.value)} placeholder="portal.example.com" required />
          </label>
          <label>
            Domain
            <input value={form.domain} onChange={(event) => onFormChange("domain", event.target.value)} placeholder="portal.example.com" required />
          </label>
          <label>
            Health check URL
            <input value={form.url} onChange={(event) => onFormChange("url", event.target.value)} placeholder="https://portal.example.com/health" required />
          </label>
          <div className="drawer-row">
            <span>Monitor interval</span>
            <strong>30 seconds</strong>
          </div>
          <div className="drawer-row">
            <span>Cloudflare zone</span>
            <strong>Auto match</strong>
          </div>
          <button className="primary-button wide" type="submit">Create Monitor</button>
        </form>
      </aside>
    </div>
  );
}
