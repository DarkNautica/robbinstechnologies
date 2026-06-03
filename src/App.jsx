import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  Bell,
  CheckCircle2,
  ChevronDown,
  Cloud,
  Command,
  Database,
  Download,
  Eye,
  FileText,
  Filter,
  Globe,
  KeyRound,
  Lock,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings,
  Shield,
  Sparkles,
  Terminal,
  User,
  Workflow,
  X
} from "lucide-react";
import { Sidebar, TopBar } from "./components/AppChrome";
import {
  AddSiteDrawer,
  AlertQueue,
  CloudflareOverview,
  DomainRail,
  HealthOverview,
  MonitorTable,
  RecentIncidents,
  SiteCards,
  TrafficPanels
} from "./components/DashboardSections";
import { AreaChart, Sparkline } from "./components/Charts";
import { EmptyState, Panel, StatusPill, TimeBadge } from "./components/Primitives";

const emptyForm = {
  name: "",
  domain: "",
  url: ""
};

const routeTitles = {
  overview: "Overview",
  sites: "Sites",
  uptime: "Uptime",
  cloudflare: "Cloudflare",
  incidents: "Incidents",
  alerts: "Alerts",
  dns: "DNS",
  traffic: "Traffic",
  domains: "Domains",
  ssl: "SSL Certs",
  workers: "Workers",
  logs: "Logs",
  reports: "Reports",
  settings: "Settings",
  keys: "API Keys"
};

function routeFromPath() {
  const slug = window.location.pathname.replace(/^\/+/, "").split("/")[0];
  return routeTitles[slug] ? slug : "overview";
}

function makeTrend(seed) {
  return Array.from({ length: 16 }, (_, index) => 52 + ((seed + index * 7) % 16) + (index % 4));
}

function formatMs(value) {
  return typeof value === "number" ? `${value} ms` : "n/a";
}

function formatPercent(value) {
  return typeof value === "number" ? `${value.toFixed(2)}%` : "n/a";
}

function buildDnsRows(zones) {
  return zones.flatMap((zone) =>
    (zone.dnsRecords || []).map((record) => ({
      ...record,
      zone: zone.name,
      zoneId: zone.id
    }))
  );
}

export default function App() {
  const [auth, setAuth] = useState({ loading: true, authenticated: false, user: "" });
  const [loginForm, setLoginForm] = useState({ username: "jayden.robbins", password: "", remember: true });
  const [loginError, setLoginError] = useState("");
  const [activeNav, setActiveNav] = useState(routeFromPath);
  const [localSites, setLocalSites] = useState([]);
  const [monitorFilter, setMonitorFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedSiteId, setSelectedSiteId] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [bulkMenuOpen, setBulkMenuOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState("security");
  const [toast, setToast] = useState("");
  const [refreshStamp, setRefreshStamp] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [cloudflare, setCloudflare] = useState({
    configured: false,
    ok: false,
    apiStatus: "Checking"
  });

  const zones = Array.isArray(cloudflare.zones) ? cloudflare.zones : [];
  const alerts = Array.isArray(cloudflare.alerts) ? cloudflare.alerts : [];
  const incidents = Array.isArray(cloudflare.incidents) ? cloudflare.incidents : [];
  const cloudflareSites = Array.isArray(cloudflare.sites) ? cloudflare.sites : [];
  const sites = useMemo(() => [...localSites, ...cloudflareSites], [localSites, cloudflareSites]);
  const selectedSite = sites.find((site) => site.id === selectedSiteId) || sites[0] || null;
  const dnsRows = useMemo(() => buildDnsRows(zones), [zones]);

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me");
      const data = await response.json();
      setAuth({ loading: false, authenticated: response.ok && data.authenticated, user: data.user || "" });
    } catch {
      setAuth({ loading: false, authenticated: false, user: "" });
    }
  }, []);

  const loadCloudflare = useCallback(async () => {
    try {
      const response = await fetch("/api/cloudflare/overview");
      const data = await response.json();
      if (response.status === 401) {
        setAuth((current) => ({ ...current, authenticated: false }));
      }
      setCloudflare(data);
    } catch (error) {
      setCloudflare({
        configured: false,
        ok: false,
        apiStatus: "Offline",
        message: error instanceof Error ? error.message : "Cloudflare bridge unavailable"
      });
    }
  }, []);

  const overallUptime = useMemo(() => {
    if (!sites.length) return 0;
    const total = sites.reduce((sum, site) => sum + site.uptime, 0);
    return total / sites.length;
  }, [sites]);

  const navStats = useMemo(() => ({
    sites: String(sites.length),
    uptime: cloudflare.ok ? "Live" : "Check",
    incidents: String(incidents.length),
    alerts: String(alerts.length),
    domains: String(zones.length),
    workers: cloudflare.summary?.workers?.value === null || cloudflare.summary?.workers?.value === undefined
      ? ""
      : String(cloudflare.summary.workers.value)
  }), [alerts.length, cloudflare, incidents.length, sites.length, zones.length]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (auth.authenticated) loadCloudflare();
  }, [auth.authenticated, loadCloudflare]);

  useEffect(() => {
    if (!selectedSiteId && sites[0]) setSelectedSiteId(sites[0].id);
  }, [selectedSiteId, sites]);

  useEffect(() => {
    const onPop = () => setActiveNav(routeFromPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
      if (event.key === "Escape") {
        setCommandOpen(false);
        setNotificationsOpen(false);
        setUserMenuOpen(false);
        setBulkMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onPanelAction = (event) => {
      const { title, action } = event.detail || {};
      showToast(`${action || "Action"} / ${title || "Dashboard"}`);
    };
    window.addEventListener("master-control:panel-action", onPanelAction);
    return () => window.removeEventListener("master-control:panel-action", onPanelAction);
  }, []);

  function navigate(page) {
    const target = page === "overview" ? "/" : `/${page}`;
    window.history.pushState({}, "", target);
    setActiveNav(page);
    setCommandOpen(false);
    setNotificationsOpen(false);
    setUserMenuOpen(false);
  }

  function refreshNow() {
    setRefreshStamp(Date.now());
    loadCloudflare();
    showToast("Live Cloudflare data refreshed");
  }

  function showToast(message) {
    setToast(message);
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(() => setToast(""), 2600);
  }

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function login(event) {
    event.preventDefault();
    setLoginError("");
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setLoginError(data.message || "Invalid credentials.");
      return;
    }
    setAuth({ loading: false, authenticated: true, user: data.user || loginForm.username });
    setLoginForm((current) => ({ ...current, password: "" }));
    showToast("Secure session established");
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuth({ loading: false, authenticated: false, user: "" });
    setCloudflare({ configured: false, ok: false, apiStatus: "Signed out" });
    navigate("overview");
  }

  function addSite(event) {
    event.preventDefault();
    const domain = form.domain.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
    const id = domain.replace(/[^a-z0-9]/gi, "-").toLowerCase();
    const newSite = {
      id: id || `site-${localSites.length + 1}`,
      name: form.name.trim() || domain,
      domain,
      url: form.url.trim(),
      status: "up",
      uptime: 100,
      response: 104,
      location: "LOCAL",
      flag: "manual",
      lastCheck: "just now",
      requests: "Manual",
      trend: makeTrend(localSites.length)
    };
    setLocalSites((current) => [newSite, ...current]);
    setSelectedSiteId(newSite.id);
    setMonitorFilter("all");
    setQuery("");
    setForm(emptyForm);
    setDrawerOpen(false);
    showToast(`${newSite.name} added locally`);
  }

  if (auth.loading) {
    return <div className="auth-loading"><span className="scan-loader" />Checking secure session</div>;
  }

  if (!auth.authenticated) {
    return (
      <LoginScreen
        form={loginForm}
        setForm={setLoginForm}
        error={loginError}
        onSubmit={login}
      />
    );
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeNav={activeNav}
        onNavChange={navigate}
        onRefresh={refreshNow}
        navStats={navStats}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((value) => !value)}
      />
      <div className="main-shell">
        <TopBar
          pageTitle={routeTitles[activeNav] || "Overview"}
          onAddSite={() => setDrawerOpen(true)}
          query={query}
          onQueryChange={setQuery}
          refreshStamp={refreshStamp}
          onRefresh={refreshNow}
          onOpenCommand={() => setCommandOpen(true)}
          notifications={alerts}
          alertsCount={alerts.length}
          user={auth.user}
          onLogout={logout}
          onNavigate={navigate}
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
        />
        <main className="dashboard" aria-label="Master Control dashboard">
          <PageHeader
            activeNav={activeNav}
            cloudflare={cloudflare}
            sites={sites}
            onRefresh={refreshNow}
            onOpenCommand={() => setCommandOpen(true)}
          />
          {renderPage(activeNav, {
            sites,
            zones,
            alerts,
            incidents,
            cloudflare,
            overallUptime,
            selectedSite,
            setSelectedSiteId,
            monitorFilter,
            setMonitorFilter,
            query,
            setQuery,
            dnsRows,
            bulkMenuOpen,
            setBulkMenuOpen,
            settingsTab,
            setSettingsTab,
            showToast
          })}
        </main>
      </div>

      <AddSiteDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={addSite}
        form={form}
        onFormChange={updateForm}
      />

      {commandOpen ? (
        <CommandPalette
          query={query}
          setQuery={setQuery}
          onClose={() => setCommandOpen(false)}
          onNavigate={navigate}
          onRefresh={refreshNow}
          onAddSite={() => setDrawerOpen(true)}
          pages={routeTitles}
        />
      ) : null}

      {toast ? <div className="toast"><Sparkles size={16} />{toast}</div> : null}
    </div>
  );
}

function renderPage(activeNav, context) {
  const {
    sites,
    zones,
    alerts,
    incidents,
    cloudflare,
    overallUptime,
    selectedSite,
    setSelectedSiteId,
    monitorFilter,
    setMonitorFilter,
    query,
    setQuery,
    dnsRows,
    bulkMenuOpen,
    setBulkMenuOpen,
    settingsTab,
    setSettingsTab,
    showToast
  } = context;

  if (activeNav === "sites" || activeNav === "uptime") {
    return (
      <div className="page-grid two-column">
        <section className="primary-column">
          <MonitorTable
            sites={sites}
            filter={monitorFilter}
            onFilterChange={setMonitorFilter}
            query={query}
            onQueryChange={setQuery}
            selectedSiteId={selectedSite?.id}
            onSelectSite={setSelectedSiteId}
          />
          <TrafficPanels summary={cloudflare.summary} />
          <SiteCards sites={sites} selectedSiteId={selectedSite?.id} onSelectSite={setSelectedSiteId} />
        </section>
        <SiteDetailPanel site={selectedSite} zones={zones} />
      </div>
    );
  }

  if (activeNav === "traffic" || activeNav === "dns") {
    return (
      <DnsManagementPage
        zones={zones}
        dnsRows={dnsRows}
        cloudflare={cloudflare}
        bulkMenuOpen={bulkMenuOpen}
        setBulkMenuOpen={setBulkMenuOpen}
        showToast={showToast}
      />
    );
  }

  if (activeNav === "cloudflare") {
    return <CloudflarePage cloudflare={cloudflare} zones={zones} />;
  }

  if (activeNav === "alerts") return <ListPage title="Alerts" items={alerts} empty="No live alerts" type="alerts" />;
  if (activeNav === "incidents") return <ListPage title="Incidents" items={incidents} empty="No live incidents" type="incidents" />;
  if (activeNav === "domains") return <DomainRail cloudflare={cloudflare} />;
  if (activeNav === "ssl") return <SslPage zones={zones} />;
  if (activeNav === "workers") return <WorkersPage cloudflare={cloudflare} />;
  if (activeNav === "logs") return <LogsPage alerts={alerts} incidents={incidents} zones={zones} />;
  if (activeNav === "reports") return <ReportsPage cloudflare={cloudflare} sites={sites} />;
  if (activeNav === "settings") return <SettingsPage tab={settingsTab} setTab={setSettingsTab} showToast={showToast} />;
  if (activeNav === "keys") return <ApiKeysPage cloudflare={cloudflare} />;

  return (
    <div className="dashboard-grid">
      <section className="primary-column">
        <HealthOverview sites={sites} overallUptime={overallUptime} incidentsCount={incidents.length} alertsCount={alerts.length} />
        <MonitorTable
          sites={sites}
          filter={monitorFilter}
          onFilterChange={setMonitorFilter}
          query={query}
          onQueryChange={setQuery}
          selectedSiteId={selectedSite?.id}
          onSelectSite={setSelectedSiteId}
        />
        <TrafficPanels summary={cloudflare.summary} />
        <SiteCards sites={sites} selectedSiteId={selectedSite?.id} onSelectSite={setSelectedSiteId} />
      </section>
      <aside className="side-column">
        <CloudflareOverview cloudflare={cloudflare} />
        <AlertQueue alerts={alerts} cloudflare={cloudflare} />
        <RecentIncidents incidents={incidents} />
      </aside>
    </div>
  );
}

function LoginScreen({ form, setForm, error, onSubmit }) {
  const [resetNotice, setResetNotice] = useState(false);
  return (
    <main className="login-screen">
      <div className="login-grid" aria-hidden="true" />
      <section className="login-panel">
        <div className="login-mark">
          <div className="brand-mark mega" />
          <h1>Master Control</h1>
          <span>Robbins Technologies</span>
        </div>

        <div className="system-chip"><span className="system-pulse" />All systems operational</div>

        <form className="login-card" onSubmit={onSubmit}>
          <div className="login-card-header">
            <Lock size={18} />
            <div>
              <strong>Secure Access</strong>
              <span>Enter your credentials to continue</span>
            </div>
          </div>
          <label>
            Username
            <input value={form.username} onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))} autoComplete="username" />
          </label>
          <label>
            Password
            <div className="password-wrap">
              <input type="password" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} autoComplete="current-password" autoFocus />
              <Eye size={15} />
            </div>
          </label>
          <div className="login-row">
            <label className="check-row">
              <input type="checkbox" checked={form.remember} onChange={(event) => setForm((current) => ({ ...current, remember: event.target.checked }))} />
              Remember me
            </label>
            <button type="button" onClick={() => setResetNotice(true)}>Forgot password?</button>
          </div>
          {error ? <div className="login-error">{error}</div> : null}
          {resetNotice ? <div className="login-error">Password reset note saved. Rotate the dashboard secret to change access.</div> : null}
          <button className="primary-button wide" type="submit">Sign In</button>
        </form>

        <div className="security-card">
          <Shield size={18} />
          <div>
            <strong>Security Info</strong>
            <span>Dashboard data is served through authenticated Pages Functions.</span>
          </div>
        </div>
      </section>
    </main>
  );
}

function PageHeader({ activeNav, cloudflare, sites, onRefresh, onOpenCommand }) {
  return (
    <section className="page-header">
      <div>
        <h1>{routeTitles[activeNav] || "Overview"}</h1>
        <p>Real-time status and controls across Robbins Technologies infrastructure.</p>
      </div>
      <div className="page-header-actions">
        <button className="ghost-button" type="button" onClick={onOpenCommand}><Command size={16} /> Commands</button>
        <button className="ghost-button" type="button" onClick={onRefresh}><RefreshCw size={16} /> Refresh</button>
        <div className="live-score">
          <span className="scope-dot" />
          <strong>{sites.length}</strong>
          <small>live zones</small>
        </div>
        <div className="live-score">
          <strong>{cloudflare.apiStatus || "Checking"}</strong>
          <small>Cloudflare API</small>
        </div>
      </div>
    </section>
  );
}

function CommandPalette({ query, setQuery, onClose, onNavigate, onRefresh, onAddSite, pages }) {
  const pageEntries = Object.entries(pages).filter(([key]) => key !== "overview");
  const actions = [
    { label: "Refresh Cloudflare data", icon: RefreshCw, action: onRefresh },
    { label: "Add a site monitor", icon: Plus, action: onAddSite },
    { label: "Open settings", icon: Settings, action: () => onNavigate("settings") },
    { label: "Open API keys", icon: KeyRound, action: () => onNavigate("keys") }
  ];

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="command-modal" role="dialog" aria-label="Command palette">
        <div className="command-input">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pages or actions..." autoFocus />
          <button type="button" onClick={onClose}><X size={17} /></button>
        </div>
        <div className="command-section">
          <span>Actions</span>
          {actions.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.label} type="button" onClick={() => { item.action(); onClose(); }}>
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </div>
        <div className="command-section">
          <span>Pages</span>
          {pageEntries.map(([key, label]) => (
            <button key={key} type="button" onClick={() => onNavigate(key)}>
              <Terminal size={16} />
              {label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function SiteDetailPanel({ site, zones }) {
  const zone = zones.find((item) => item.id === site?.id);
  if (!site) return <Panel title="Site Details"><EmptyState title="No site selected" detail="Select a live monitor to inspect it." /></Panel>;

  return (
    <aside className="detail-panel">
      <Panel title="Record Details" action="Live">
        <div className="detail-hero">
          <Globe size={22} />
          <div>
            <strong>{site.name}</strong>
            <span>{site.url}</span>
          </div>
          <StatusPill status={site.status} />
        </div>
        <div className="detail-grid">
          <MetricMini label="Response" value={formatMs(site.response)} />
          <MetricMini label="Health" value={formatPercent(site.uptime)} />
          <MetricMini label="DNS records" value={site.dnsCount ?? "n/a"} />
          <MetricMini label="Proxied" value={site.proxiedCount ?? "n/a"} />
          <MetricMini label="SSL mode" value={site.sslMode || "unknown"} />
          <MetricMini label="SSL status" value={site.sslStatus || "unknown"} />
        </div>
        <Sparkline data={site.trend || [0, 0]} tone={site.status === "up" ? "good" : "danger"} />
      </Panel>
      <Panel title="Zone Settings" action="Manage">
        <div className="settings-list">
          <span><b>Plan</b>{zone?.plan || "Cloudflare"}</span>
          <span><b>Type</b>{zone?.type || "unknown"}</span>
          <span><b>Status</b>{zone?.status || "unknown"}</span>
          <span><b>Nameservers</b>{zone?.nameServers?.join(", ") || "n/a"}</span>
        </div>
      </Panel>
    </aside>
  );
}

function DnsManagementPage({ zones, dnsRows, cloudflare, bulkMenuOpen, setBulkMenuOpen, showToast }) {
  return (
    <div className="dns-page">
      <Panel title="DNS / Zone Management" action="Records">
        <div className="dns-toolbar">
          <div className="status-badge"><CheckCircle2 size={15} /> {cloudflare.permissions?.dns ? "DNS access" : "DNS permission needed"}</div>
          <label className="inline-search"><Search size={16} /><input placeholder="Search records..." /></label>
          <button className="ghost-button" type="button"><Filter size={15} /> Filter</button>
          <div className="menu-wrap">
            <button className="ghost-button" type="button" onClick={() => setBulkMenuOpen((open) => !open)}>Bulk Actions <ChevronDown size={15} /></button>
            {bulkMenuOpen ? (
              <div className="popover mini-menu">
                <button type="button" onClick={() => showToast("Proxy toggle queued")}>Enable proxy</button>
                <button type="button" onClick={() => showToast("Proxy disable queued")}>Disable proxy</button>
                <button type="button" className="danger-menu-item" onClick={() => showToast("Delete requires confirmation")}>Delete selected</button>
                <button type="button" onClick={() => showToast("CSV export prepared")}>Export to CSV</button>
              </div>
            ) : null}
          </div>
          <button className="primary-button" type="button" onClick={() => showToast("Add record drawer ready")}><Plus size={16} /> Add Record</button>
        </div>
        <div className="dns-table-wrap">
          <table className="monitor-table">
            <thead>
              <tr><th>Type</th><th>Name</th><th>Content</th><th>Proxy</th><th>TTL</th><th>Zone</th><th /></tr>
            </thead>
            <tbody>
              {dnsRows.slice(0, 8).map((record) => (
                <tr key={record.id}>
                  <td>{record.type}</td>
                  <td>{record.name}</td>
                  <td className="muted-cell">{record.content}</td>
                  <td>{record.proxied ? "Proxied" : "DNS only"}</td>
                  <td>{record.ttl === 1 ? "Auto" : record.ttl}</td>
                  <td>{record.zone}</td>
                  <td><button className="row-action" type="button"><MoreHorizontal size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!dnsRows.length ? <EmptyState title="No DNS records available" detail={cloudflare.permissions?.dns ? "Cloudflare returned no DNS records." : "Add Zone DNS read permission to populate this table."} /> : null}
      </Panel>
      <div className="dns-side-grid">
        <Panel title="Zone Matrix" action={`${zones.length} zones`}>
          <div className="zone-list">
            {zones.map((zone) => (
              <article key={zone.id}>
                <span className="scope-dot" />
                <div><strong>{zone.name}</strong><small>{zone.plan}</small></div>
                <TimeBadge>{zone.status}</TimeBadge>
              </article>
            ))}
          </div>
        </Panel>
        <Panel title="Settings / Authentication" action="Security">
          <div className="auth-grid">
            <MetricMini label="Session" value="Enabled" />
            <MetricMini label="API token" value={cloudflare.ok ? "Verified" : "Check"} />
            <MetricMini label="DNS access" value={cloudflare.permissions?.dns ? "Ready" : "Missing"} />
            <MetricMini label="Workers" value={cloudflare.summary?.workers?.value ?? "n/a"} />
          </div>
        </Panel>
      </div>
    </div>
  );
}

function CloudflarePage({ cloudflare, zones }) {
  return (
    <div className="page-grid two-column">
      <section className="primary-column">
        <CloudflareOverview cloudflare={cloudflare} />
        <Panel title="Zone Coverage" action="Cloudflare API">
          <div className="zone-card-grid">
            {zones.map((zone) => (
              <article key={zone.id} className="zone-card">
                <Globe size={18} />
                <strong>{zone.name}</strong>
                <span>{zone.plan}</span>
                <Sparkline data={zone.site?.trend || [0, 0]} tone={zone.site?.status === "up" ? "good" : "danger"} />
              </article>
            ))}
          </div>
        </Panel>
      </section>
      <aside className="side-column">
        <Panel title="Permissions" action="Token scope">
          <div className="settings-list">
            {Object.entries(cloudflare.permissions || {}).map(([key, value]) => (
              <span key={key}><b>{key}</b>{value ? "Available" : "Missing"}</span>
            ))}
          </div>
        </Panel>
      </aside>
    </div>
  );
}

function ListPage({ title, items, empty, type }) {
  return (
    <Panel title={title} action="Live">
      <div className="large-list">
        {items.map((item) => (
          <article key={item.id} className={`large-list-row ${item.level || item.status}`}>
            <span className="notification-dot" />
            <div>
              <strong>{item.title}</strong>
              <span>{item.detail}</span>
            </div>
            <time>{item.time}</time>
            <button className="ghost-button" type="button">Inspect</button>
          </article>
        ))}
      </div>
      {!items.length ? <EmptyState title={empty} detail={`No ${type} are active right now.`} /> : null}
    </Panel>
  );
}

function SslPage({ zones }) {
  return (
    <Panel title="SSL Certificates" action="Cloudflare">
      <div className="zone-card-grid">
        {zones.map((zone) => (
          <article key={zone.id} className="zone-card">
            <Shield size={18} />
            <strong>{zone.name}</strong>
            <span>Mode: {zone.sslMode}</span>
            <TimeBadge>{zone.sslStatus}</TimeBadge>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function WorkersPage({ cloudflare }) {
  return (
    <Panel title="Workers" action="Services">
      <div className="auth-grid">
        <MetricMini label="Services" value={cloudflare.summary?.workers?.value ?? "n/a"} />
        <MetricMini label="Permission" value={cloudflare.permissions?.workers ? "Ready" : "Missing"} />
        <MetricMini label="Account" value={cloudflare.accountName || "Cloudflare"} />
      </div>
      <EmptyState title="Worker detail controls ready" detail="Next pass can add deployments, routes, logs, and invocations." />
    </Panel>
  );
}

function LogsPage({ alerts, incidents, zones }) {
  const rows = [...alerts, ...incidents].slice(0, 10);
  return (
    <Panel title="Logs" action={`${rows.length} events`}>
      <div className="terminal-list">
        {rows.map((row) => <code key={row.id}>[{row.time}] {row.title} - {row.detail}</code>)}
        {zones.map((zone) => <code key={zone.id}>[zone] {zone.name} status={zone.status} ssl={zone.sslMode}</code>)}
      </div>
    </Panel>
  );
}

function ReportsPage({ cloudflare, sites }) {
  return (
    <div className="report-grid">
      <Panel title="Operations Report" action="Export">
        <AreaChart data={cloudflare.summary?.response?.series || [0]} tone="good" label="report response" />
      </Panel>
      <Panel title="Inventory Summary" action="Download">
        <div className="auth-grid">
          <MetricMini label="Sites" value={sites.length} />
          <MetricMini label="Alerts" value={cloudflare.alerts?.length || 0} />
          <MetricMini label="DNS records" value={cloudflare.summary?.dns?.value ?? "n/a"} />
          <MetricMini label="Workers" value={cloudflare.summary?.workers?.value ?? "n/a"} />
        </div>
        <button className="primary-button"><Download size={15} /> Download report</button>
      </Panel>
    </div>
  );
}

function SettingsPage({ tab, setTab, showToast }) {
  const tabs = ["profile", "security", "preferences", "notifications"];
  return (
    <Panel title="Settings / Authentication" action="Secure">
      <div className="tabs">
        {tabs.map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)} type="button">{item}</button>)}
      </div>
      <div className="settings-grid">
        <article>
          <Lock size={18} />
          <strong>Change Password</strong>
          <span>Update the Pages secret AUTH_PASSWORD to rotate access.</span>
          <button className="ghost-button" type="button" onClick={() => showToast("Rotate AUTH_PASSWORD in Cloudflare Pages secrets")}>Manage</button>
        </article>
        <article>
          <User size={18} />
          <strong>Active Session</strong>
          <span>Authenticated with an HttpOnly signed cookie.</span>
          <button className="ghost-button" type="button" onClick={() => showToast("Session is active")}>Inspect</button>
        </article>
        <article>
          <Bell size={18} />
          <strong>Notifications</strong>
          <span>Live alert feed is connected to Cloudflare API state.</span>
          <button className="ghost-button" type="button" onClick={() => showToast("Notification preferences saved")}>Save</button>
        </article>
      </div>
    </Panel>
  );
}

function ApiKeysPage({ cloudflare }) {
  return (
    <Panel title="API Keys" action="Protected">
      <div className="api-key-card">
        <KeyRound size={22} />
        <div>
          <strong>Cloudflare API Token</strong>
          <span>Stored as a server-side secret. The browser never receives it.</span>
        </div>
        <StatusPill status={cloudflare.ok ? "up" : "degraded"} />
      </div>
      <div className="settings-list">
        <span><b>Token status</b>{cloudflare.tokenStatus || "unknown"}</span>
        <span><b>Account</b>{cloudflare.accountName || "Cloudflare"}</span>
        <span><b>Masked account</b>{cloudflare.accountId || "n/a"}</span>
      </div>
    </Panel>
  );
}

function MetricMini({ label, value }) {
  return (
    <div className="metric-mini">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
