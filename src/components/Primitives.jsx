import { ArrowUpRight, CheckCircle2, CircleAlert, CircleDot, CircleSlash, Clock3 } from "lucide-react";

export function Panel({ title, action, children, className = "" }) {
  return (
    <section className={`panel ${className}`}>
      <div className="panel-header">
        <h2>{title}</h2>
        {action ? <button className="text-action" type="button">{action}</button> : null}
      </div>
      {children}
    </section>
  );
}

export function StatusDot({ status }) {
  return <span className={`status-dot ${status}`} aria-hidden="true" />;
}

export function StatusPill({ status }) {
  const labels = {
    up: "Up",
    degraded: "Degraded",
    down: "Down",
    maintenance: "Maintenance"
  };

  return (
    <span className={`status-pill ${status}`}>
      <StatusDot status={status} />
      {labels[status]}
    </span>
  );
}

export function MetricBlock({ value, label, link, spark }) {
  return (
    <article className="metric-block">
      <strong>{value}</strong>
      <span>{label}</span>
      {spark}
      <button className="metric-link" type="button">
        {link}
        <ArrowUpRight size={14} strokeWidth={2.2} />
      </button>
    </article>
  );
}

export function AlertGlyph({ level }) {
  const iconProps = { size: 17, strokeWidth: 2.4 };
  if (level === "critical") return <CircleAlert {...iconProps} />;
  if (level === "warning") return <CircleAlert {...iconProps} />;
  if (level === "info") return <CircleDot {...iconProps} />;
  return <CheckCircle2 {...iconProps} />;
}

export function SmallStat({ label, value, tone = "good" }) {
  return (
    <div className="small-stat">
      <StatusDot status={tone === "good" ? "up" : tone === "warn" ? "degraded" : "down"} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function EmptyState({ title, detail }) {
  return (
    <div className="empty-state">
      <CircleSlash size={20} strokeWidth={2.2} />
      <strong>{title}</strong>
      <span>{detail}</span>
    </div>
  );
}

export function TimeBadge({ children }) {
  return (
    <span className="time-badge">
      <Clock3 size={13} strokeWidth={2.1} />
      {children}
    </span>
  );
}
