import { useState } from "react";

const STATUS_STYLE = (s) => {
  if (s === "In Transit") return { bg: "rgba(59,130,246,0.12)", color: "#60a5fa", dot: "#3b82f6" };
  if (s === "Delivered")  return { bg: "rgba(74,222,128,0.12)", color: "#4ade80", dot: "#1db954" };
  if (s === "Pending")    return { bg: "rgba(251,191,36,0.12)", color: "#fbbf24", dot: "#f59e0b" };
  return { bg: "rgba(255,255,255,0.06)", color: "#aaa", dot: "#aaa" };
};

const MODE_ICON = { Air: "✈️", Rail: "🚂", Road: "🚛", Sea: "🚢" };

const DEFAULT_SHIPMENTS = [
  { id: "SH-001", origin: "Chennai",     destination: "Bangalore",  status: "In Transit", carbon: "45kg", mode: "Rail", eco: 88, weight: "210 kg", eta: "Today 6pm",   merchant: "Flipkart" },
  { id: "SH-002", origin: "Mumbai",      destination: "Delhi",      status: "Delivered",  carbon: "70kg", mode: "Air",  eco: 34, weight: "95 kg",  eta: "Done",        merchant: "Amazon IN" },
  { id: "SH-003", origin: "Coimbatore",  destination: "Hyderabad",  status: "Pending",    carbon: "25kg", mode: "Road", eco: 74, weight: "160 kg", eta: "Tomorrow",    merchant: "Meesho" },
];

// ─── Detail Drawer ────────────────────────────────────────────────────────────
function DetailDrawer({ shipment, onClose }) {
  if (!shipment) return null;
  const st = STATUS_STYLE(shipment.status);
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)",
        display: "flex", justifyContent: "flex-end",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 360, height: "100%", background: "#0b2014",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          padding: "28px 24px", overflowY: "auto",
          animation: "slideIn 0.25s ease",
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: "#fff" }}>{shipment.id}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{shipment.merchant}</div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.07)", border: "none", color: "#fff", width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 16 }}>✕</button>
        </div>

        {/* Status banner */}
        <div style={{ background: st.bg, border: `1px solid ${st.dot}44`, borderRadius: 12, padding: "13px 16px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: st.dot, boxShadow: `0 0 6px ${st.dot}` }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: st.color }}>{shipment.status}</span>
          <span style={{ marginLeft: "auto", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>ETA: {shipment.eta}</span>
        </div>

        {/* Route visual */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "16px", marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 12 }}>Route</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>From</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", fontFamily: "'Syne',sans-serif" }}>{shipment.origin}</div>
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.15)" }} />
              <span style={{ fontSize: 18 }}>{MODE_ICON[shipment.mode]}</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.15)" }} />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>To</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", fontFamily: "'Syne',sans-serif" }}>{shipment.destination}</div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Transport", value: `${MODE_ICON[shipment.mode]} ${shipment.mode}` },
            { label: "Weight",    value: shipment.weight },
            { label: "Carbon",    value: shipment.carbon },
            { label: "Eco Score", value: `${shipment.eco} / 100` },
          ].map(s => (
            <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", fontFamily: "'Syne',sans-serif" }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Eco score bar */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "14px 16px", marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.7px" }}>Eco Score</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: shipment.eco >= 80 ? "#4ade80" : shipment.eco >= 60 ? "#fbbf24" : "#f87171" }}>{shipment.eco}/100</span>
          </div>
          <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 3, width: `${shipment.eco}%`,
              background: shipment.eco >= 80 ? "linear-gradient(90deg,#1db954,#4ade80)" : shipment.eco >= 60 ? "#f59e0b" : "#f87171",
            }} />
          </div>
        </div>

        <button style={{
          width: "100%", padding: "13px", borderRadius: 11, border: "none",
          background: "linear-gradient(135deg,#16a34a,#15803d)", color: "#fff",
          fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer",
          boxShadow: "0 4px 20px rgba(22,163,74,0.25)",
        }}>Optimize This Route →</button>
      </div>
    </div>
  );
}

// ─── ShipmentTable ────────────────────────────────────────────────────────────
export default function ShipmentTable({ shipments = DEFAULT_SHIPMENTS }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .ship-row { transition: background 0.15s; cursor: pointer; }
        .ship-row:hover { background: rgba(255,255,255,0.04) !important; }
      `}</style>

      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16, overflow: "hidden",
        marginTop: 20, fontFamily: "'DM Sans',sans-serif",
      }}>
        {/* Table header bar */}
        <div style={{
          padding: "16px 20px 12px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, color: "#fff" }}>Shipments</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{shipments.length} records · click row for details</span>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {["ID", "Origin", "Destination", "Mode", "Carbon", "Eco", "Status"].map(h => (
                <th key={h} style={{
                  padding: "10px 16px", textAlign: "left",
                  fontSize: 10, color: "rgba(255,255,255,0.3)",
                  textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 500,
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shipments.map((s) => {
              const st = STATUS_STYLE(s.status);
              const carbonNum = parseInt(s.carbon);
              const carbonColor = carbonNum > 60 ? "#f87171" : carbonNum > 35 ? "#fbbf24" : "#4ade80";
              return (
                <tr
                  key={s.id}
                  className="ship-row"
                  onClick={() => setSelected(s)}
                  style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: "#4ade80" }}>{s.id}</span>
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{s.origin}</td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{s.destination}</td>
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{ fontSize: 14 }}>{MODE_ICON[s.mode] ?? "📦"}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginLeft: 5 }}>{s.mode}</span>
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: 13, fontWeight: 500, color: carbonColor }}>{s.carbon}</td>
                  <td style={{ padding: "13px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 40, height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{
                          height: "100%", borderRadius: 2,
                          width: `${s.eco}%`,
                          background: s.eco >= 80 ? "#1db954" : s.eco >= 60 ? "#f59e0b" : "#f87171",
                        }} />
                      </div>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{s.eco}</span>
                    </div>
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
                      background: st.bg, color: st.color,
                      display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap",
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: st.dot, display: "inline-block" }} />
                      {s.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selected && <DetailDrawer shipment={selected} onClose={() => setSelected(null)} />}
    </>
  );
}