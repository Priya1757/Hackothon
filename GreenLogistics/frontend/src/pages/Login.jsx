import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("Merchant");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        html, body, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
        }

        .eco-root {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          background: #05140a;
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
        }

        .eco-input {
          width: 100%;
          padding: 13px 14px 13px 42px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          box-sizing: border-box;
        }
        .eco-input::placeholder { color: rgba(255,255,255,0.25); }
        .eco-input:focus {
          border-color: rgba(29,185,84,0.55);
          background: rgba(29,185,84,0.06);
        }
        .login-btn {
          transition: transform 0.2s, box-shadow 0.2s;
          width: 100%;
          padding: 15px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #16a34a, #15803d);
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          box-shadow: 0 4px 24px rgba(22,163,74,0.3);
        }
        .login-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(22,163,74,0.45);
        }
        .login-btn:active { transform: translateY(0); }

        .role-tab {
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
        }
        .role-tab:hover { opacity: 0.85; }

        .forgot-btn {
          background: none;
          border: none;
          color: #4ade80;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }
        .forgot-btn:hover { color: #86efac; }
      `}</style>

      <div className="eco-root">
        {/* Blur Orbs */}
        <div style={{ position:"absolute", width:400, height:400, background:"#0d6e2a", top:-80, left:-100, opacity:0.45, filter:"blur(90px)", borderRadius:"50%", pointerEvents:"none" }} />
        <div style={{ position:"absolute", width:320, height:320, background:"#0a3d5c", bottom:-60, right:-80, opacity:0.4, filter:"blur(90px)", borderRadius:"50%", pointerEvents:"none" }} />
        <div style={{ position:"absolute", width:220, height:220, background:"#1a8c3a", top:"50%", left:"60%", opacity:0.18, filter:"blur(80px)", borderRadius:"50%", pointerEvents:"none" }} />

        {/* Grid overlay */}
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize:"40px 40px",
        }} />

        {/* Card */}
        <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:420 }}>
          <div style={{
            background:"rgba(255,255,255,0.055)",
            border:"1px solid rgba(255,255,255,0.1)",
            borderRadius:24,
            padding:"2.5rem 2rem",
            backdropFilter:"blur(24px)",
          }}>

            {/* Brand Row */}
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:"2rem" }}>
              <div style={{
                width:44, height:44,
                background:"linear-gradient(135deg, #1db954, #0f8c3a)",
                borderRadius:12,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:22, flexShrink:0,
                boxShadow:"0 0 24px rgba(29,185,84,0.35)",
              }}>🌱</div>
              <div>
                <h1 style={{ fontFamily:"'Syne', sans-serif", fontSize:20, fontWeight:800, color:"#fff", letterSpacing:"-0.3px", lineHeight:1.1, margin:0 }}>
                  EcoRoute AI
                </h1>
                <p style={{ fontSize:11, color:"rgba(255,255,255,0.45)", letterSpacing:"0.5px", textTransform:"uppercase", marginTop:2, margin:0 }}>
                  Smart Sustainable Logistics
                </p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height:1, background:"rgba(255,255,255,0.08)", marginBottom:"1.75rem" }} />

            {/* Role Tabs */}
            <p style={{ fontSize:11, fontWeight:500, color:"rgba(255,255,255,0.35)", letterSpacing:1, textTransform:"uppercase", marginBottom:"1rem", margin:"0 0 1rem" }}>
              Sign in as
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:"1.5rem" }}>
              {["Merchant", "Logistics Manager"].map((r) => (
                <button
                  key={r}
                  className="role-tab"
                  onClick={() => setRole(r)}
                  style={{
                    border: role === r ? "1px solid rgba(29,185,84,0.4)" : "1px solid rgba(255,255,255,0.08)",
                    background: role === r ? "rgba(29,185,84,0.12)" : "rgba(255,255,255,0.05)",
                    color: role === r ? "#4ade80" : "rgba(255,255,255,0.5)",
                  }}
                >
                  <span style={{
                    width:28, height:28, borderRadius:8,
                    background: role === r ? "rgba(29,185,84,0.2)" : "rgba(255,255,255,0.06)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:14, flexShrink:0,
                  }}>
                    {r === "Merchant" ? "🏪" : "🚛"}
                  </span>
                  {r}
                </button>
              ))}
            </div>

            {/* Email */}
            <div style={{ marginBottom:"1rem" }}>
              <label style={{ display:"block", fontSize:11, fontWeight:500, color:"rgba(255,255,255,0.4)", letterSpacing:"0.8px", textTransform:"uppercase", marginBottom:6 }}>
                Email
              </label>
              <div style={{ position:"relative", display:"flex", alignItems:"center" }}>
                <span style={{ position:"absolute", left:14, color:"rgba(255,255,255,0.3)", fontSize:15, pointerEvents:"none" }}>✉</span>
                <input type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="eco-input" />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom:"1rem" }}>
              <label style={{ display:"block", fontSize:11, fontWeight:500, color:"rgba(255,255,255,0.4)", letterSpacing:"0.8px", textTransform:"uppercase", marginBottom:6 }}>
                Password
              </label>
              <div style={{ position:"relative", display:"flex", alignItems:"center" }}>
                <span style={{ position:"absolute", left:14, color:"rgba(255,255,255,0.3)", fontSize:15, pointerEvents:"none" }}>🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="eco-input"
                  style={{ paddingRight:44 }}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position:"absolute", right:12, background:"none", border:"none", color:"rgba(255,255,255,0.35)", cursor:"pointer", fontSize:16, padding:4, lineHeight:1 }}
                  aria-label="Toggle password"
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* Remember / Forgot */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", margin:"1.25rem 0 1.5rem" }}>
              <label style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"rgba(255,255,255,0.45)", cursor:"pointer" }}>
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ accentColor:"#1db954", width:16, height:16 }} />
                Remember me
              </label>
              <button className="forgot-btn">Forgot password?</button>
            </div>

            {/* Login Button */}
            <button onClick={handleLogin} className="login-btn">
              Continue to Dashboard →
            </button>

            {/* Stats */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginTop:"1.5rem" }}>
              {[
                { value:"42%", label:"CO₂ reduced" },
                { value:"18k", label:"Routes daily" },
                { value:"99.4%", label:"On-time rate" },
              ].map((s) => (
                <div key={s.label} style={{
                  background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.07)",
                  borderRadius:10, padding:"10px 8px", textAlign:"center",
                }}>
                  <span style={{ fontFamily:"'Syne', sans-serif", fontSize:15, fontWeight:700, color:"#4ade80", display:"block" }}>{s.value}</span>
                  <span style={{ fontSize:10, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.5px", display:"block", marginTop:2 }}>{s.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}