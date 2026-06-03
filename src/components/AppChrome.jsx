import {
  Activity,
  Archive,
  Bell,
  BarChart3,
  ChevronDown,
  Cloud,
  Command,
  Database,
  FileText,
  Globe,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Sparkles,
  TriangleAlert,
  User,
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
  dns: Database,
  traffic: BarChart3,
  domains: Globe,
  ssl: Shield,
  workers: Workflow,
  logs: FileText,
  reports: Archive,
  settings: Settings,
  keys: KeyRound
};

export function Sidebar({ activeNav, onNavChange, onRefresh, navStats = {}, collapsed, onToggleCollapse }) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="brand">
        <div className="brand-mark" aria-hidden="true" />
        <div className="brand-copy">
          <strong>Master Control</strong>
          <span>Robbins Technologies</span>
        </div>
        <button className="icon-button collapse-button" type="button" onClick={onToggleCollapse} aria-label="Collapse sidebar">
          <Menu size={17} />
        </button>
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
              title={item.label}
            >
              <Icon size={18} strokeWidth={2} />
              <span>{item.label}</span>
              {meta ? <small className={item.id === "incidents" || item.id === "alerts" ? item.id : ""}>{meta}</small> : null}
            </button>
          );
        })}
      </nav>

      <div className="nav-footer">
        <button className="refresh-tile" type="button" onClick={onRefresh}>
          <span><span className="live-dot" />Live sync</span>
          <RefreshCw size={16} strokeWidth={2.2} />
        </button>
      </div>
    </aside>
  );
}

export function TopBar({
  pageTitle,
  onAddSite,
  query,
  onQueryChange,
  refreshStamp,
  onRefresh,
  onOpenCommand,
  notifications,
  alertsCount,
  user,
  onLogout,
  onNavigate,
  notificationsOpen,
  setNotificationsOpen,
  userMenuOpen,
  setUserMenuOpen
}) {
  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" type="button" aria-label="Toggle menu">
        <Menu size={20} strokeWidth={2} />
      </button>

      <div className="page-kicker">
        <span className="scope-dot" />
        <strong>{pageTitle}</strong>
      </div>

      <label className="global-search" onClick={onOpenCommand}>
        <Search size={18} strokeWidth={2} />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          onClick={(event) => event.stopPropagation()}
          placeholder="Search or run command..."
        />
        <kbd>Ctrl K</kbd>
      </label>

      <div className="system-status">
        <span key={refreshStamp || "idle"} className={`system-pulse ${refreshStamp ? "pulse-on" : ""}`} />
        <strong>All systems watched</strong>
      </div>

      <button className="primary-button" type="button" onClick={onAddSite}>
        <Plus size={18} strokeWidth={2.4} />
        Add Site
      </button>

      <button className="icon-button" type="button" onClick={onRefresh} aria-label="Refresh live data">
        <RefreshCw size={18} />
      </button>

      <div className="topbar-popover-wrap">
        <button className="plain-button" type="button" onClick={() => setNotificationsOpen((open) => !open)} aria-label="Open alerts menu">
          <Bell size={17} strokeWidth={2.2} />
          Alerts
          <span className="count-bubble">{alertsCount}</span>
        </button>
        {notificationsOpen ? (
          <div className="popover notification-popover">
            <div className="popover-header">
              <strong>Notifications</strong>
              <button type="button">Mark all read</button>
            </div>
            {(notifications || []).slice(0, 5).map((item) => (
              <article key={item.id} className={`notification-row ${item.level}`}>
                <span className="notification-dot" />
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </div>
                <time>{item.time}</time>
              </article>
            ))}
            {!notifications?.length ? <div className="mini-empty">No active notifications</div> : null}
          </div>
        ) : null}
      </div>

      <button className="icon-button command-button" type="button" onClick={onOpenCommand} aria-label="Open command palette">
        <Command size={18} />
      </button>

      <div className="topbar-popover-wrap">
        <button className="operator-button" type="button" onClick={() => setUserMenuOpen((open) => !open)} aria-label="Open user menu">
          <span>{user || "Operator"}</span>
          <strong>{String(user || "OP").slice(0, 2).toUpperCase()}</strong>
          <ChevronDown size={16} strokeWidth={2} />
        </button>
        {userMenuOpen ? (
          <div className="popover user-popover">
            <div className="user-card">
              <div className="avatar-ring"><User size={18} /></div>
              <div>
                <strong>{user || "Operator"}</strong>
                <span>Authenticated session</span>
              </div>
            </div>
            <button type="button" onClick={onOpenCommand}><Sparkles size={15} /> Open command palette</button>
            <button type="button" onClick={() => { onNavigate("settings"); setUserMenuOpen(false); }}><Settings size={15} /> Session settings</button>
            <button type="button" className="danger-menu-item" onClick={onLogout}><LogOut size={15} /> Sign out</button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
