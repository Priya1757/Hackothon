export default function StatCard({ icon, title, value, sub, trend, color = "#1db954" }) {
  return (
    <>
      <style>{`
        .stat-card { transition: border-color 0.2s, transform 0.2s; }
        .stat-card:hover { transform: translateY(-2px); }
      `}</style>

      <div
        className="stat-card"
        onMouseEnter={e => e.currentTarget.style.borderColor = `${color}44`}
        onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: "20px",
          flex: "1 1 180px",
          minWidth: 160,
          position: "relative",
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Glow accent */}
        <div style={{
          position: "absolute", top: -30, right: -30,
          width: 100, height: 100,
          background: color, borderRadius: "50%",
          opacity: 0.06, filter: "blur(20px)", pointerEvents: "none",
        }} />

        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          {icon && (
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: `${color}18`, border: `1px solid ${color}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18,
            }}>{icon}</div>
          )}
          {trend !== undefined && (
            <span style={{
              fontSize: 11, fontWeight: 500,
              color: trend >= 0 ? "#4ade80" : "#f87171",
              background: trend >= 0 ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)",
              padding: "3px 8px", borderRadius: 20,
            }}>
              {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
            </span>
          )}
        </div>

        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 26, fontWeight: 800,
          color: "#fff", lineHeight: 1, marginBottom: 4,
        }}>
          {value}
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{title}</div>
        {sub && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 4 }}>{sub}</div>}
      </div>
    </>
  );
}