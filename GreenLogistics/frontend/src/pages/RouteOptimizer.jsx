import { useState } from "react";

function ConfidenceRing({ pct, color="#1db954" }) {
  const R=44, circ=2*Math.PI*R, dash=(pct/100)*circ;
  return (
    <svg width={110} height={110} style={{ display:"block" }}>
      <circle cx={55} cy={55} r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={10} />
      <circle cx={55} cy={55} r={R} fill="none" stroke={color} strokeWidth={10} strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={circ*0.25} strokeLinecap="round" />
      <text x={55} y={50} textAnchor="middle" style={{ fill:"#fff", fontSize:20, fontFamily:"'Syne',sans-serif", fontWeight:800 }}>{pct}%</text>
      <text x={55} y={66} textAnchor="middle" style={{ fill:"rgba(255,255,255,0.35)", fontSize:9, letterSpacing:"1px" }}>CONFIDENCE</text>
    </svg>
  );
}

function RouteRow({ route, recommended }) {
  const modeIcons  = { Air:"✈️", Rail:"🚂", Road:"🚛", Sea:"🚢" };
  const modeColors = { Air:"#f87171", Rail:"#1db954", Road:"#f59e0b", Sea:"#3b82f6" };
  const col = modeColors[route.mode] || "#888";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:16, padding:"14px 16px", borderRadius:12, background:recommended?"rgba(29,185,84,0.07)":"rgba(255,255,255,0.03)", border:`1px solid ${recommended?"rgba(29,185,84,0.25)":"rgba(255,255,255,0.07)"}`, position:"relative", overflow:"hidden" }}>
      {recommended && <div style={{ position:"absolute", top:8, right:10, fontSize:10, fontWeight:600, color:"#4ade80", background:"rgba(29,185,84,0.15)", padding:"2px 8px", borderRadius:20, letterSpacing:"0.5px" }}>✦ AI PICK</div>}
      <div style={{ width:42, height:42, borderRadius:11, background:`${col}18`, border:`1px solid ${col}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{modeIcons[route.mode]}</div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:13, fontWeight:600, color:"#fff", fontFamily:"'Syne',sans-serif", marginBottom:4 }}>{route.name}</div>
        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          {[{label:"Duration",value:route.duration},{label:"Carbon",value:route.carbon},{label:"Cost",value:route.cost}].map(m => (
            <div key={m.label}>
              <span style={{ fontSize:10, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.5px" }}>{m.label} </span>
              <span style={{ fontSize:12, color:recommended?"#4ade80":"rgba(255,255,255,0.6)", fontWeight:500 }}>{m.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ textAlign:"right", flexShrink:0 }}>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", marginBottom:2 }}>Eco score</div>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, color:col }}>{route.score}</div>
      </div>
    </div>
  );
}

export default function RouteOptimizer() {
  const [applied, setApplied] = useState(false);
  const [origin, setOrigin]   = useState("Mumbai");
  const [destination, setDest] = useState("Delhi");
  const [cargo, setCargo]     = useState("Electronics");

  const routes = [
    { mode:"Rail", name:"Express Rail — Mumbai Central → Hazrat Nizamuddin", duration:"18h",  carbon:"62 kg",  cost:"₹12,400", score:"94" },
    { mode:"Road", name:"Highway Freight — NH48 via Vadodara",               duration:"22h",  carbon:"118 kg", cost:"₹9,800",  score:"71" },
    { mode:"Air",  name:"Air Cargo — BOM → DEL",                             duration:"2.5h", carbon:"542 kg", cost:"₹38,000", score:"28" },
    { mode:"Sea",  name:"Coastal + Rail — Mumbai Port → JNPT",               duration:"48h",  carbon:"44 kg",  cost:"₹8,200",  score:"97" },
  ];

  const waypoints = [
    { icon:"🏭", label:origin,       sublabel:"Origin",      color:"#3b82f6" },
    { icon:"🚂", label:"Rail Hub",   sublabel:"Checkpoint",  color:"#1db954" },
    { icon:"🔋", label:"Eco Stop",   sublabel:"Fuel-free",   color:"#4ade80" },
    { icon:"📦", label:destination,  sublabel:"Destination", color:"#f59e0b" },
  ];

  const savings = [
    { icon:"🌿", label:"CO₂ Saved",   value:"480 kg",  color:"#1db954" },
    { icon:"💰", label:"Cost Delta",  value:"−₹25.6k", color:"#f59e0b" },
    { icon:"⏱",  label:"Time Added", value:"+15.5h",   color:"#a78bfa" },
    { icon:"🌍", label:"Trees Equiv.",value:"22 trees", color:"#4ade80" },
  ];

  return (
    <div style={{ padding:"32px 36px", fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`.eco-input{width:100%;padding:11px 14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#fff;font-family:'DM Sans',sans-serif;font-size:13px;outline:none;transition:border-color 0.2s;box-sizing:border-box;} .eco-input:focus{border-color:rgba(29,185,84,0.5);} .eco-input::placeholder{color:rgba(255,255,255,0.2);} @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>

      {/* Header */}
      <div style={{ marginBottom:28 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
          <div style={{ width:32, height:32, borderRadius:9, background:"rgba(29,185,84,0.15)", border:"1px solid rgba(29,185,84,0.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, animation:"pulse 2.5s ease infinite" }}>🤖</div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:800, color:"#fff", margin:0, letterSpacing:"-0.5px" }}>AI Route Optimizer</h1>
        </div>
        <p style={{ fontSize:13, color:"rgba(255,255,255,0.35)", margin:0 }}>Machine-learning powered routing · Minimize carbon · Maximize efficiency</p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:24 }}>
        {/* LEFT */}
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

          {/* Params */}
          <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"20px" }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, color:"#fff", marginBottom:16 }}>Route Parameters</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:14 }}>
              {[{label:"Origin",value:origin,setter:setOrigin,ph:"e.g. Mumbai"},{label:"Destination",value:destination,setter:setDest,ph:"e.g. Delhi"},{label:"Cargo Type",value:cargo,setter:setCargo,ph:"e.g. Electronics"}].map(f => (
                <div key={f.label}>
                  <label style={{ display:"block", fontSize:10, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:6 }}>{f.label}</label>
                  <input className="eco-input" value={f.value} onChange={e => f.setter(e.target.value)} placeholder={f.ph} />
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:10 }}>
              {["Fastest","Cheapest","Greenest","Balanced"].map(p => (
                <button key={p} style={{ padding:"7px 14px", borderRadius:8, border:`1px solid ${p==="Greenest"?"rgba(29,185,84,0.3)":"rgba(255,255,255,0.1)"}`, background:p==="Greenest"?"rgba(29,185,84,0.15)":"rgba(255,255,255,0.04)", color:p==="Greenest"?"#4ade80":"rgba(255,255,255,0.45)", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:500, cursor:"pointer" }}>{p}</button>
              ))}
            </div>
          </div>

          {/* Route Path */}
          <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"20px" }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, color:"#fff", marginBottom:20 }}>Recommended Route Path</div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 8px" }}>
              {waypoints.map((w, i) => (
                <div key={w.label} style={{ display:"flex", alignItems:"center", flex: i < waypoints.length-1 ? "1" : "0" }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, minWidth:80 }}>
                    <div style={{ width:52, height:52, borderRadius:14, background:`${w.color}20`, border:`2px solid ${w.color}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, boxShadow:`0 0 20px ${w.color}33` }}>{w.icon}</div>
                    <div style={{ textAlign:"center" }}>
                      <div style={{ fontSize:12, fontWeight:600, color:"#fff", fontFamily:"'Syne',sans-serif" }}>{w.label}</div>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", marginTop:2 }}>{w.sublabel}</div>
                    </div>
                  </div>
                  {i < waypoints.length-1 && (
                    <div style={{ flex:1, display:"flex", alignItems:"center", padding:"0 8px", marginBottom:28 }}>
                      <div style={{ flex:1, height:2, background:"linear-gradient(90deg,rgba(29,185,84,0.6),rgba(29,185,84,0.2))", borderRadius:2 }} />
                      <div style={{ fontSize:10, color:"#4ade80", padding:"0 4px" }}>›</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Route Options */}
          <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"20px" }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, color:"#fff", marginBottom:14 }}>All Route Options</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {routes.map((r, i) => <RouteRow key={r.mode} route={r} recommended={i===0} />)}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

          {/* AI Score */}
          <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(29,185,84,0.2)", borderRadius:16, padding:"20px", textAlign:"center" }}>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:"1px", marginBottom:12 }}>AI Recommendation</div>
            <ConfidenceRing pct={92} color="#1db954" />
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, color:"#fff", margin:"12px 0 4px" }}>Rail Transport</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginBottom:16 }}>Mumbai Central → Hazrat Nizamuddin</div>
            <div style={{ height:1, background:"rgba(255,255,255,0.07)", marginBottom:16 }} />
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.5)", lineHeight:1.6, textAlign:"left" }}>Rail significantly reduces CO₂ vs air. Lower cost despite longer transit — optimal for non-urgent electronics cargo.</div>
          </div>

          {/* Savings */}
          <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"20px" }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, color:"#fff", marginBottom:14 }}>Impact Summary</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {savings.map(s => (
                <div key={s.label} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, padding:"12px" }}>
                  <div style={{ fontSize:18, marginBottom:6 }}>{s.icon}</div>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, color:s.color }}>{s.value}</div>
                  <div style={{ fontSize:10, color:"rgba(255,255,255,0.35)", marginTop:2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison */}
          <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"20px" }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, color:"#fff", marginBottom:14 }}>Current vs Recommended</div>
            {[
              {label:"Transport", current:"✈️ Air",    recommended:"🚂 Rail"},
              {label:"Carbon",    current:"542 kg CO₂", recommended:"62 kg CO₂"},
              {label:"Cost",      current:"₹38,000",    recommended:"₹12,400"},
              {label:"Duration",  current:"2.5 hours",  recommended:"18 hours"},
              {label:"Eco Score", current:"28 / 100",   recommended:"94 / 100"},
            ].map(r => (
              <div key={r.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontSize:11, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:"0.5px", width:72 }}>{r.label}</span>
                <span style={{ fontSize:12, color:"#f87171", textDecoration:"line-through" }}>{r.current}</span>
                <span style={{ fontSize:12, color:"#4ade80", fontWeight:500 }}>→ {r.recommended}</span>
              </div>
            ))}
            <button onClick={() => setApplied(!applied)} style={{ width:"100%", marginTop:16, padding:"13px", borderRadius:11, border:applied?"1px solid rgba(29,185,84,0.3)":"none", background:applied?"rgba(29,185,84,0.15)":"linear-gradient(135deg,#16a34a,#15803d)", color:applied?"#4ade80":"#fff", fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700, cursor:"pointer", boxShadow:applied?"none":"0 4px 20px rgba(22,163,74,0.3)", transition:"all 0.3s" }}>
              {applied ? "✓ Route Applied" : "Apply Recommendation →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}