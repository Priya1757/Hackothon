import { Link, useLocation } from "react-router-dom";

const navItems = [
  { id: "dashboard",   path: "/dashboard",  icon: "🗂",  label: "Dashboard" },
  { id: "shipments",   path: "/shipments",  icon: "📦",  label: "Shipments" },
  { id: "routes",      path: "/routes",     icon: "🗺",  label: "Routes" },
  { id: "warehouses",  path: "/warehouses", icon: "🏭",  label: "Warehouses" },
  { id: "analytics",   path: "/analytics",  icon: "📊",  label: "Analytics" },
  { id: "carbon",      path: "/carbon",     icon: "🌿",  label: "Carbon Report" },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const active = navItems.find(n => pathname.startsWith(n.path))?.id ?? "dashboard";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');
        .nav-link-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 12px;
          border-radius: 10px;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          cursor: pointer;
          text-align: left;
          margin-bottom: 2px;
          text-decoration: none;
          transition: all 0.15s;
        }
        .nav-link-btn:hover {
          background: rgba(255,255,255,0.07) !important;
          color: rgba(255,255,255,0.85) !important;
        }
      `}</style>

      <aside style={{
        width: 240,
        minHeight: "100vh",
        background: "#071a0e",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
        fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* Brand */}
        <div style={{ padding: "28px 24px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <Link to="/dashboard" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36,
              background: "linear-gradient(135deg, #1db954, #0f8c3a)",
              borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18,
              boxShadow: "0 0 16px rgba(29,185,84,0.3)",
            }}>🌱</div>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15, color: "#fff" }}>
                EcoRoute AI
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.6px" }}>
                Logistics Platform
              </div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 12px" }}>
          <div style={{
            fontSize: 10, color: "rgba(255,255,255,0.25)",
            letterSpacing: "1px", textTransform: "uppercase",
            padding: "0 12px", marginBottom: 8,
          }}>
            Main Menu
          </div>

          {navItems.map((item) => {
            const isActive = item.id === active;
            return (
              <Link
                key={item.id}
                to={item.path}
                className="nav-link-btn"
                style={{
                  background: isActive ? "rgba(29,185,84,0.12)" : "transparent",
                  color: isActive ? "#4ade80" : "rgba(255,255,255,0.45)",
                  fontWeight: isActive ? 500 : 400,
                  borderLeft: isActive ? "2px solid #1db954" : "2px solid transparent",
                }}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div style={{ padding: "16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "linear-gradient(135deg, #064e24, #0a7c3a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, border: "1px solid rgba(29,185,84,0.25)",
            }}>👤</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>Alex Morgan</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Logistics Manager</div>
            </div>
            <Link
              to="/"
              title="Logout"
              style={{
                marginLeft: "auto", background: "none", border: "none",
                color: "rgba(255,255,255,0.3)", fontSize: 16, textDecoration: "none",
              }}
            >⏻</Link>
          </div>
        </div>

      </aside>
    </>
  );
}