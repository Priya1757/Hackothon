import { useState } from "react";

function BarChart({ data, color = "#1db954", unit = "kg" }) {
  const max = Math.max(...data.map(d => d.value));
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:160, paddingTop:24, position:"relative" }}>
      {data.map((d, i) => (
        <div key={d.label} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6, position:"relative" }}
          onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
          {hovered === i && (
            <div style={{ position:"absolute", top:-32, left:"50%", transform:"translateX(-50%)", background:"#1a2e1f", border:"1px solid rgba(29,185,84,0.3)", borderRadius:6, padding:"3px 8px", fontSize:11, color:"#4ade80", whiteSpace:"nowrap", zIndex:10 }}>
              {d.value} {unit}
            </div>
          )}
          <div style={{ width:"100%", borderRadius:"5px 5px 0 0", background: hovered === i ? `linear-gradient(to top, ${color}, #86efac)` : `linear-gradient(to top, ${color}99, ${color}55)`, height:`${(d.value/max)*140}px`, transition:"all 0.3s ease", cursor:"pointer" }} />
          <span style={{ fontSize:10, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:"0.5px" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ segments }) {
  const total = segments.reduce((s, d) => s + d.value, 0);
  let cumulative = 0;
  const R = 60, cx = 80, cy = 80, stroke = 22, circ = 2 * Math.PI * R;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:24 }}>
      <svg width={160} height={160} style={{ flexShrink:0 }}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
        {segments.map((seg, i) => {
          const pct = seg.value / total;
          const dash = pct * circ;
          const offset = circ * (1 - cumulative);
          cumulative += pct;
          return <circle key={i} cx={cx} cy={cy} r={R} fill="none" stroke={seg.color} strokeWidth={stroke} strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={offset} strokeLinecap="round" style={{ transform:"rotate(-90deg)", transformOrigin:`${cx}px ${cy}px` }} />;
        })}
        <text x={cx} y={cy-6} textAnchor="middle" style={{ fill:"#fff", fontSize:18, fontFamily:"'Syne',sans-serif", fontWeight:800 }}>{total}</text>
        <text x={cx} y={cy+12} textAnchor="middle" style={{ fill:"rgba(255,255,255,0.35)", fontSize:10 }}>kg CO₂</text>
      </svg>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {segments.map((seg, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:10, height:10, borderRadius:3, background:seg.color, flexShrink:0 }} />
            <div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.7)" }}>{seg.label}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)" }}>{seg.value} kg · {Math.round(seg.value/total*100)}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendLine({ data, color = "#1db954", height = 80 }) {
  const W = 400, H = height;
  const vals = data.map(d => d.value);
  const max = Math.max(...vals), min = Math.min(...vals);
  const pts = vals.map((v, i) => [( i / (vals.length-1)) * W, H - ((v-min)/(max-min||1)) * (H-10) - 5]);
  const pathD = pts.map((p, i) => `${i===0?"M":"L"}${p[0]},${p[1]}`).join(" ");
  const areaD = `${pathD} L${W},${H} L0,${H} Z`;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display:"block" }}>
      <defs>
        <linearGradient id={`g${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#g${color.replace("#","")})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill={color} stroke="#05140a" strokeWidth="2" />)}
    </svg>
  );
}

function KpiCard({ icon, label, value, sub, trend, color = "#1db954", delay = 0 }) {
  return (
    <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:"20px", position:"relative", overflow:"hidden", flex:"1 1 160px", animation:`fadeUp 0.5s ease ${delay}s both` }}>
      <div style={{ position:"absolute", top:-20, right:-20, width:80, height:80, background:color, borderRadius:"50%", opacity:0.07, filter:"blur(16px)", pointerEvents:"none" }} />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
        <div style={{ width:36, height:36, borderRadius:10, background:`${color}18`, border:`1px solid ${color}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>{icon}</div>
        {trend !== undefined && (
          <span style={{ fontSize:11, fontWeight:500, color:trend>=0?"#4ade80":"#f87171", background:trend>=0?"rgba(74,222,128,0.1)":"rgba(248,113,113,0.1)", padding:"3px 8px", borderRadius:20 }}>
            {trend>=0?"↑":"↓"} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:24, fontWeight:800, color:"#fff", lineHeight:1, marginBottom:4 }}>{value}</div>
      <div style={{ fontSize:12, color:"rgba(255,255,255,0.45)" }}>{label}</div>
      {sub && <div style={{ fontSize:11, color:"rgba(255,255,255,0.25)", marginTop:3 }}>{sub}</div>}
    </div>
  );
}

export default function Analytics() {
  const [range, setRange] = useState("6M");

  const monthlyEmissions = [
    {label:"Jan",value:500},{label:"Feb",value:420},{label:"Mar",value:300},
    {label:"Apr",value:260},{label:"May",value:310},{label:"Jun",value:240},
  ];
  const carbonSaved = [
    {label:"Jan",value:210},{label:"Feb",value:340},{label:"Mar",value:290},
    {label:"Apr",value:480},{label:"May",value:420},{label:"Jun",value:520},
  ];
  const trendData = [
    {label:"Jan",value:500},{label:"Feb",value:420},{label:"Mar",value:300},
    {label:"Apr",value:260},{label:"May",value:310},{label:"Jun",value:240},
  ];
  const donutSegments = [
    {label:"Road Freight", value:480, color:"#1db954"},
    {label:"Air Freight",  value:310, color:"#3b82f6"},
    {label:"Sea Freight",  value:190, color:"#f59e0b"},
    {label:"Last Mile",    value:140, color:"#a78bfa"},
  ];
  const tableRows = [
    {month:"January",  emitted:500, saved:210, routes:312, efficiency:"58%"},
    {month:"February", emitted:420, saved:340, routes:289, efficiency:"67%"},
    {month:"March",    emitted:300, saved:290, routes:340, efficiency:"74%"},
    {month:"April",    emitted:260, saved:480, routes:401, efficiency:"81%"},
    {month:"May",      emitted:310, saved:420, routes:378, efficiency:"79%"},
    {month:"June",     emitted:240, saved:520, routes:420, efficiency:"88%"},
  ];

  return (
    <div style={{ padding:"32px 36px", fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} } .range-btn{transition:all 0.15s;cursor:pointer;}`}</style>

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:28 }}>
        <div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:800, color:"#fff", margin:0, letterSpacing:"-0.5px" }}>Carbon Analytics</h1>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.35)", margin:"4px 0 0" }}>Emissions tracking · Route efficiency · Impact report</p>
        </div>
        <div style={{ display:"flex", gap:6, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, padding:4 }}>
          {["1M","3M","6M","1Y"].map(r => (
            <button key={r} className="range-btn" onClick={() => setRange(r)} style={{ padding:"6px 14px", borderRadius:7, border:"none", background:range===r?"rgba(29,185,84,0.15)":"transparent", color:range===r?"#4ade80":"rgba(255,255,255,0.4)", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:500 }}>{r}</button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:28 }}>
        <KpiCard icon="🌿" label="Total Carbon Saved"   value="520 kg" sub="vs baseline routes" trend={18}  color="#1db954" delay={0.05} />
        <KpiCard icon="📉" label="Emissions Reduced"    value="−48%"   sub="since January"      trend={-48} color="#3b82f6" delay={0.10} />
        <KpiCard icon="🛣️" label="Optimized Routes"     value="2,140"  sub="this period"        trend={22}  color="#f59e0b" delay={0.15} />
        <KpiCard icon="⚡" label="Avg Route Efficiency" value="74.5%"  sub="fleet average"      trend={9}   color="#a78bfa" delay={0.20} />
      </div>

      {/* Bar charts */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:24 }}>
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"20px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
            <span style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, color:"#fff" }}>Monthly Emissions</span>
            <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>kg CO₂</span>
          </div>
          <p style={{ fontSize:12, color:"rgba(255,255,255,0.3)", margin:"0 0 16px" }}>Hover bars for exact values</p>
          <BarChart data={monthlyEmissions} color="#3b82f6" unit="kg CO₂" />
        </div>
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"20px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
            <span style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, color:"#fff" }}>Carbon Saved</span>
            <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>kg CO₂</span>
          </div>
          <p style={{ fontSize:12, color:"rgba(255,255,255,0.3)", margin:"0 0 16px" }}>Savings vs unoptimized routes</p>
          <BarChart data={carbonSaved} color="#1db954" unit="kg saved" />
        </div>
      </div>

      {/* Trend + Donut */}
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20, marginBottom:24 }}>
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"20px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <span style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, color:"#fff" }}>Emission Trend</span>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ width:8, height:8, borderRadius:2, background:"#3b82f6" }} />
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.35)" }}>Emissions kg CO₂</span>
            </div>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            {trendData.map(d => <span key={d.label} style={{ fontSize:10, color:"rgba(255,255,255,0.3)", textTransform:"uppercase" }}>{d.label}</span>)}
          </div>
          <TrendLine data={trendData} color="#3b82f6" height={100} />
        </div>
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"20px" }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, color:"#fff", marginBottom:16 }}>By Transport Mode</div>
          <DonutChart segments={donutSegments} />
        </div>
      </div>

      {/* Table */}
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, overflow:"hidden" }}>
        <div style={{ padding:"18px 20px 14px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, color:"#fff" }}>Monthly Breakdown</span>
          <button style={{ fontSize:12, color:"#4ade80", background:"none", border:"none", cursor:"pointer" }}>Export CSV →</button>
        </div>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr>{["Month","CO₂ Emitted","CO₂ Saved","Routes Run","Efficiency"].map(h => (
              <th key={h} style={{ padding:"10px 20px", textAlign:"left", fontSize:10, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.8px", fontWeight:500 }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {tableRows.map(r => (
              <tr key={r.month} style={{ borderTop:"1px solid rgba(255,255,255,0.04)", transition:"background 0.15s", cursor:"default" }}
                onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.03)"}
                onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                <td style={{ padding:"12px 20px", fontSize:13, color:"#fff", fontWeight:500, fontFamily:"'Syne',sans-serif" }}>{r.month}</td>
                <td style={{ padding:"12px 20px", fontSize:13, color:"#f87171" }}>{r.emitted} kg</td>
                <td style={{ padding:"12px 20px", fontSize:13, color:"#4ade80" }}>+{r.saved} kg</td>
                <td style={{ padding:"12px 20px", fontSize:13, color:"rgba(255,255,255,0.6)" }}>{r.routes}</td>
                <td style={{ padding:"12px 20px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ flex:1, height:5, background:"rgba(255,255,255,0.08)", borderRadius:3, overflow:"hidden" }}>
                      <div style={{ height:"100%", borderRadius:3, width:r.efficiency, background:parseInt(r.efficiency)>=80?"#1db954":parseInt(r.efficiency)>=70?"#f59e0b":"#f87171" }} />
                    </div>
                    <span style={{ fontSize:12, color:"rgba(255,255,255,0.5)", minWidth:32 }}>{r.efficiency}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}