import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');
        .nav-link { transition: color 0.15s; }
        .nav-link:hover { color: #4ade80 !important; }
      `}</style>

      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(5,20,10,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 32px",
        display: "flex", alignItems: "center",
        height: 60,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
          <div style={{
            width: 32, height: 32,
            background: "linear-gradient(135deg, #1db954, #0f8c3a)",
            borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, boxShadow: "0 0 12px rgba(29,185,84,0.3)",
          }}>🌱</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, color: "#fff" }}>
            EcoRoute AI
          </span>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 4, marginLeft: 40 }}>
          {[
            { label: "Dashboard",  path: "/dashboard" },
            { label: "Shipments",  path: "/shipments" },
            { label: "Routes",     path: "/routes" },
            { label: "Analytics",  path: "/analytics" },
          ].map(l => (
            <button
              key={l.path}
              className="nav-link"
              onClick={() => navigate(l.path)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "6px 14px", borderRadius: 8,
                fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                color: window.location.pathname === l.path ? "#4ade80" : "rgba(255,255,255,0.5)",
                fontWeight: window.location.pathname === l.path ? 500 : 400,
              }}
            >{l.label}</button>
          ))}
        </div>

        {/* Right side */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "rgba(29,185,84,0.1)", border: "1px solid rgba(29,185,84,0.2)",
            borderRadius: 20, padding: "4px 12px",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#1db954" }} />
            <span style={{ fontSize: 12, color: "#4ade80", fontWeight: 500 }}>Live</span>
          </div>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8, padding: "6px 14px",
              color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, cursor: "pointer",
            }}
          >Logout</button>
        </div>
      </nav>
    </>
  );
}