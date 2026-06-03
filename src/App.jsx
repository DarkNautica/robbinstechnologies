import { useCallback, useEffect, useMemo, useState } from "react";
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

const emptyForm = {
  name: "",
  domain: "",
  url: ""
};

function makeTrend(seed) {
  return Array.from({ length: 16 }, (_, index) => 52 + ((seed + index * 7) % 16) + (index % 4));
}

export default function App() {
  const [activeNav, setActiveNav] = useState("overview");
  const [localSites, setLocalSites] = useState([]);
  const [monitorFilter, setMonitorFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedSiteId, setSelectedSiteId] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [refreshStamp, setRefreshStamp] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [cloudflare, setCloudflare] = useState({
    configured: false,
    ok: false,
    apiStatus: "Checking"
  });

  const loadCloudflare = useCallback(async () => {
    try {
      const response = await fetch("/api/cloudflare/overview");
      const data = await response.json();
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

  const cloudflareSites = Array.isArray(cloudflare.sites) ? cloudflare.sites : [];
  const sites = useMemo(() => [...localSites, ...cloudflareSites], [localSites, cloudflareSites]);

  const overallUptime = useMemo(() => {
    if (!sites.length) return 0;
    const total = sites.reduce((sum, site) => sum + site.uptime, 0);
    return total / sites.length;
  }, [sites]);

  const selectedSite = sites.find((site) => site.id === selectedSiteId) || sites[0] || null;

  const navStats = useMemo(() => ({
    sites: String(sites.length),
    uptime: cloudflare.ok ? "Live" : "Check",
    incidents: String(cloudflare.incidents?.length || 0),
    alerts: String(cloudflare.alerts?.length || 0),
    domains: String(cloudflare.zones?.length || 0),
    workers: cloudflare.summary?.workers?.value === null || cloudflare.summary?.workers?.value === undefined
      ? ""
      : String(cloudflare.summary.workers.value)
  }), [cloudflare, sites.length]);

  useEffect(() => {
    loadCloudflare();
  }, [loadCloudflare]);

  useEffect(() => {
    if (!selectedSiteId && sites[0]) {
      setSelectedSiteId(sites[0].id);
    }
  }, [selectedSiteId, sites]);

  function refreshNow() {
    setRefreshStamp(Date.now());
    loadCloudflare();
  }

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
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
      location: "IAD",
      flag: "US",
      lastCheck: "just now",
      requests: "0",
      trend: makeTrend(localSites.length)
    };

    setLocalSites((current) => [newSite, ...current]);
    setSelectedSiteId(newSite.id);
    setMonitorFilter("all");
    setQuery("");
    setForm(emptyForm);
    setDrawerOpen(false);
    refreshNow();
  }

  return (
    <div className="app-shell">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} onRefresh={refreshNow} navStats={navStats} />
      <div className="main-shell">
        <TopBar onAddSite={() => setDrawerOpen(true)} query={query} onQueryChange={setQuery} refreshStamp={refreshStamp} />
        <main className="dashboard" aria-label="Master Control dashboard">
          <div className="dashboard-grid">
            <section className="primary-column" aria-label="Site health and uptime">
              <HealthOverview
                sites={sites}
                overallUptime={overallUptime}
                incidentsCount={cloudflare.incidents?.length || 0}
                alertsCount={cloudflare.alerts?.length || 0}
              />
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
              <DomainRail cloudflare={cloudflare} />
            </section>
            <aside className="side-column" aria-label="Cloudflare and alerts">
              <CloudflareOverview cloudflare={cloudflare} />
              <AlertQueue alerts={cloudflare.alerts || []} cloudflare={cloudflare} />
              <RecentIncidents incidents={cloudflare.incidents || []} />
            </aside>
          </div>
        </main>
      </div>

      <AddSiteDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={addSite}
        form={form}
        onFormChange={updateForm}
      />
    </div>
  );
}
