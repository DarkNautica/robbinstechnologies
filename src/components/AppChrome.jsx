import {
  Activity,
  Archive,
  Bell,
  BarChart3,
  ChevronDown,
  Cloud,
  FileText,
  Globe,
  KeyRound,
  LayoutDashboard,
  Menu,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Sun,
  TriangleAlert,
  Workflow
} from "lucide-react";
import { navItems } from "../data/dashboardData";

const iconMap = {
  overview: LayoutDashboard,
  sites: Globe,
  uptime: Activity,
  cloudflare: Cloud,
  incidents: TriangleAlert,
  alerts: Bell,
  traffic: BarChart3,
  domains: Globe,
  ssl: Shield,
  workers: Workflow,
  logs: FileText,
  reports: Archive,
  settings: Settings,
  keys: KeyRound
};

export function Sidebar({ activeNav, onNavChange, onRefresh, navStats = {} }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true" />
        <div>
          <strong>Master Control</strong>
          <span>v2.4.1</span>
        </div>
      </div>

      <nav className="nav-list" aria-label="Primary">
        {navItems.map((item) => {
          const Icon = iconMap[item.id] || LayoutDashboard;
          const meta = navStats[item.id] ?? item.meta;
          return (
            <button
              key={item.id}
              className={`nav-item ${activeNav === item.id ? "active" : ""}`}
              type="button"
              onClick={() => onNavChange(item.id)}
            >
              <Icon size={18} strokeWidth={2} />
              <span>{item.label}</span>
              {meta ? <small className={item.id === "incidents" || item.id === "alerts" ? item.id : ""}>{meta}</small> : null}
            </button>
          );
        })}
      </nav>

      <div className="nav-footer">
        <button className="nav-item" type="button" onClick={() => onNavChange("settings")}>
          <Settings size={18} strokeWidth={2} />
          <span>Settings</span>
        </button>
        <button className="nav-item" type="button" onClick={() => onNavChange("keys")}>
          <KeyRound size={18} strokeWidth={2} />
          <span>API Keys</span>
        </button>
        <button className="refresh-tile" type="button" onClick={onRefresh}>
          <span><span className="live-dot" />Refresh in 10s</span>
          <RefreshCw size={16} strokeWidth={2.2} />
        </button>
      </div>
    </aside>
  );
}

export function TopBar({ onAddSite, query, onQueryChange, refreshStamp }) {
  return (
    <header className="topbar">
      <button className="icon-button" type="button" aria-label="Toggle menu">
        <Menu size={20} strokeWidth={2} />
      </button>
      <label className="global-search">
        <Search size={18} strokeWidth={2} />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search sites, domains, incidents..."
        />
        <kbd>Ctrl K</kbd>
      </label>
      <div className="system-status">
        <span key={refreshStamp || "idle"} className={`system-pulse ${refreshStamp ? "pulse-on" : ""}`} />
        <strong>All Systems Operational</strong>
      </div>
      <button className="primary-button" type="button" onClick={onAddSite}>
        <Plus size={18} strokeWidth={2.4} />
        Add Site
      </button>
      <div className="topbar-divider" />
      <button className="plain-button" type="button">
        <Bell size={17} strokeWidth={2.2} />
        Updates
        <span className="count-bubble">3</span>
      </button>
      <button className="icon-button" type="button" aria-label="Theme">
        <Sun size={18} strokeWidth={2} />
      </button>
      <button className="operator-button" type="button">
        <span>Operator</span>
        <strong>OP</strong>
        <ChevronDown size={16} strokeWidth={2} />
      </button>
    </header>
  );
}
