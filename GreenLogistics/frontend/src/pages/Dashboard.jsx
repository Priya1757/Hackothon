import { useState } from "react";
import StatCard from "../components/StatCard";

function Sparkline({ data, color = "#1db954" }) {
  const max = Math.max(...data), min = Math.min(...data);
  const W = 120, H = 36;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * W},${H - ((v - min) / (max - min || 1)) * H}`).join(" ");
  return (
    <svg width={W} height={H} style={{ display: "block" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function ShipmentsTable() {
  const rows = [
    { id:"SH-4821", origin:"Mumbai",  dest:"Delhi",     status:"In Transit", carbon:"12 kg", eta:"Today 4pm" },
    { id:"SH-4819", origin:"Chennai", dest:"Bangalore", status:"Delivered",  carbon:"8 kg",  eta:"Done" },
    { id:"SH-4817", origin:"Pune",    dest:"Hyderabad", status:"Pending",    carbon:"21 kg", eta:"Tomorrow" },
    { id:"SH-4815", origin:"Kolkata", dest:"Mumbai",    status:"In Transit", carbon:"34 kg", eta:"Today 8pm" },
    { id:"SH-4812", origin:"Delhi",   dest:"Jaipur",    status:"Delivered",  carbon:"6 kg",  eta:"Done" },
  ];
  const statusStyle = (s) => {
    if (s === "In Transit") return { bg:"rgba(59,130,246,0.1)",  color:"#60a5fa" };
    if (s === "Delivered")  return { bg:"rgba(74,222,128,0.1)",  color:"#4ade80" };
    if (s === "Pending")    return { bg:"rgba(251,191,36,0.1)",  color:"#fbbf24" };
    return { bg:"rgba(255,255,255,0.05)", color:"rgba(255,255,255,0.4)" };
  };
  return (
    <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, overflow:"hidden" }}>
      <div style={{ padding:"18px 20px 14px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, color:"#fff" }}>Recent Shipments</span>
        <button style={{ fontSize:12, color:"#4ade80", background:"none", border:"none", cursor:"pointer" }}>View all →</button>
      </div>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr>{["ID","Route","Status","Carbon","ETA"].map(h => (
            <th key={h} style={{ padding:"10px 20px", textAlign:"left", fontSize:10, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.8px", fontWeight:500 }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {rows.map(r => {
            const st = statusStyle(r.status);
            return (
              <tr key={r.id} style={{ borderTop:"1px solid rgba(255,255,255,0.04)", transition:"background 0.15s", cursor:"pointer" }}
                onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.03)"}
                onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                <td style={{ padding:"12px 20px", fontSize:13, color:"#4ade80", fontFamily:"'Syne',sans-serif", fontWeight:600 }}>{r.id}</td>
                <td style={{ padding:"12px 20px", fontSize:13, color:"rgba(255,255,255,0.7)" }}>{r.origin} → {r.dest}</td>
                <td style={{ padding:"12px 20px" }}>
                  <span style={{ fontSize:11, fontWeight:500, padding:"3px 10px", borderRadius:20, background:st.bg, color:st.color }}>{r.status}</span>
                </td>
                <td style={{ padding:"12px 20px", fontSize:13, color:"rgba(255,255,255,0.5)" }}>{r.carbon}</td>
                <td style={{ padding:"12px 20px", fontSize:13, color:"rgba(255,255,255,0.5)" }}>{r.eta}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function CarbonChart() {
  const months = ["Jan","Feb","Mar","Apr","May","Jun"];
  const saved   = [210,340,290,480,420,520];
  const emitted = [380,310,350,260,290,240];
  const max = Math.max(...saved, ...emitted);
  return (
    <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"18px 20px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <span style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, color:"#fff" }}>Carbon Overview</span>
        <div style={{ display:"flex", gap:16 }}>
          {[{label:"Saved",color:"#1db954"},{label:"Emitted",color:"#374151"}].map(l => (
            <div key={l.label} style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ width:8, height:8, borderRadius:2, background:l.color }} />
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"flex-end", gap:10, height:120 }}>
        {months.map((m, i) => (
          <div key={m} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <div style={{ width:"100%", display:"flex", gap:3, alignItems:"flex-end", height:100 }}>
              <div style={{ flex:1, borderRadius:"4px 4px 0 0", background:"linear-gradient(to top,#1db954,#4ade80)", height:`${(saved[i]/max)*100}%` }} />
              <div style={{ flex:1, borderRadius:"4px 4px 0 0", background:"rgba(255,255,255,0.1)", height:`${(emitted[i]/max)*100}%` }} />
            </div>
            <span style={{ fontSize:10, color:"rgba(255,255,255,0.3)" }}>{m}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div style={{ padding:"32px 36px", fontFamily:"'DM Sans',sans-serif" }}>

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:32 }}>
        <div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:800, color:"#fff", margin:0, letterSpacing:"-0.5px" }}>
            Green Logistics Dashboard
          </h1>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.35)", margin:"4px 0 0" }}>Real-time overview</p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button style={{ padding:"9px 16px", borderRadius:10, border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.05)", color:"rgba(255,255,255,0.6)", fontSize:13, cursor:"pointer" }}>🔔 Alerts</button>
          <button style={{ padding:"9px 16px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#16a34a,#15803d)", color:"#fff", fontSize:13, fontWeight:500, cursor:"pointer", boxShadow:"0 4px 16px rgba(22,163,74,0.25)" }}>+ New Shipment</button>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:28 }}>
        <StatCard icon="📦" title="Total Shipments"   value="125"    sub="This month"    trend={12}  color="#1db954" />
        <StatCard icon="🚚" title="Active Deliveries" value="35"     sub="Right now"     trend={5}   color="#3b82f6" />
        <StatCard icon="🌿" title="Carbon Saved"      value="520 kg" sub="vs last month" trend={18}  color="#4ade80" />
        <StatCard icon="🏭" title="Warehouses"        value="8"      sub="4 countries"               color="#f59e0b" />
      </div>

      {/* Sparklines */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:16, marginBottom:28 }}>
        {[
          { label:"Deliveries / week", data:[20,35,28,45,38,52,48], color:"#1db954" },
          { label:"CO₂ saved / day",   data:[60,45,80,55,90,70,88], color:"#3b82f6" },
          { label:"Route efficiency",  data:[70,72,68,75,80,78,85], color:"#f59e0b" },
          { label:"Fuel usage (L)",    data:[300,280,310,260,240,255,230], color:"#f87171" },
        ].map(item => (
          <div key={item.label} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:"14px 16px" }}>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", marginBottom:8 }}>{item.label}</div>
            <Sparkline data={item.data} color={item.color} />
            <div style={{ fontSize:18, fontFamily:"'Syne',sans-serif", fontWeight:700, color:"#fff", marginTop:6 }}>{item.data[item.data.length-1]}</div>
          </div>
        ))}
      </div>

      {/* Bottom grid */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <div style={{ gridColumn:"1 / -1" }}><ShipmentsTable /></div>
        <CarbonChart />
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"18px 20px" }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, color:"#fff", marginBottom:16 }}>Quick Actions</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {[
              { icon:"🗺", label:"Optimize All Routes",    desc:"Recalculate for lowest carbon" },
              { icon:"📋", label:"Generate Carbon Report", desc:"Export monthly PDF" },
              { icon:"🔔", label:"Set Delivery Alerts",    desc:"ETA & delay notifications" },
              { icon:"🏭", label:"Add Warehouse",          desc:"Register new location" },
            ].map(a => (
              <button key={a.label} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", borderRadius:10, border:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.03)", cursor:"pointer", textAlign:"left", transition:"all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.background="rgba(29,185,84,0.07)"; e.currentTarget.style.borderColor="rgba(29,185,84,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; }}>
                <span style={{ fontSize:20 }}>{a.icon}</span>
                <div>
                  <div style={{ fontSize:13, color:"#fff", fontWeight:500 }}>{a.label}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>{a.desc}</div>
                </div>
                <span style={{ marginLeft:"auto", color:"rgba(255,255,255,0.2)", fontSize:14 }}>›</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}