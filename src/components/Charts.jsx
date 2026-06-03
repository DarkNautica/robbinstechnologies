const chartColors = {
  good: "#07927e",
  warn: "#f4a016",
  danger: "#e84d5b",
  info: "#266de8",
  muted: "#66768a"
};

function pointsFor(data, width, height, padding = 4) {
  if (data.length < 2) {
    const value = data[0] || 0;
    const y = height - padding - (value ? height / 3 : 0);
    return `${padding},${y.toFixed(1)} ${width - padding},${y.toFixed(1)}`;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;

  return data
    .map((value, index) => {
      const x = padding + (index / (data.length - 1)) * (width - padding * 2);
      const y = height - padding - ((value - min) / span) * (height - padding * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export function Sparkline({ data, tone = "good", height = 34 }) {
  const width = 116;
  const color = chartColors[tone] || chartColors.good;

  return (
    <svg className="sparkline" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <polyline points={pointsFor(data, width, height)} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AreaChart({ data, tone = "good", label }) {
  const width = 440;
  const height = 170;
  const linePoints = pointsFor(data, width, height, 14);
  const first = linePoints.split(" ")[0];
  const last = linePoints.split(" ").at(-1);
  const color = chartColors[tone] || chartColors.good;
  const areaPoints = `${first} ${linePoints} ${last.split(",")[0]},${height - 12} ${first.split(",")[0]},${height - 12}`;
  const fillId = `fill-${label.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`;

  return (
    <svg className="area-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0.03" />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((row) => (
        <line key={row} x1="14" x2={width - 14} y1={30 + row * 46} y2={30 + row * 46} className="chart-gridline" />
      ))}
      <polygon points={areaPoints} fill={`url(#${fillId})`} />
      <polyline points={linePoints} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="15" y="158" className="chart-label">00:00</text>
      <text x="142" y="158" className="chart-label">06:00</text>
      <text x="266" y="158" className="chart-label">12:00</text>
      <text x="390" y="158" className="chart-label">24:00</text>
    </svg>
  );
}
